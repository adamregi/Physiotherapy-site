<?php
/**
 * PhysioGlides - Hardened Appointment Booking Backend
 * Safe and secure booking script designed for Hostinger PHP/MySQL environment.
 */

// 1. Error Configuration and Response Headers
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-CSRF-Token');

// Programmatic Security Headers (fallback if mod_headers is disabled)
header('X-Frame-Options: SAMEORIGIN');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Content-Security-Policy: default-src \'self\'; script-src \'self\' https://challenges.cloudflare.com; frame-src \'self\' https://challenges.cloudflare.com https://www.google.com; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src \'self\' https://fonts.gstatic.com; img-src \'self\' data:; connect-src \'self\' https://challenges.cloudflare.com;');

// 2. Load Configurations & Start Secure Session
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    sendResponse(false, 'System configuration error. Please try calling us directly.', 500);
}
require_once $configFile;

if (session_status() === PHP_SESSION_NONE) {
    session_start([
        'cookie_lifetime' => 0,
        'cookie_secure'    => true,
        'cookie_httponly'  => true,
        'cookie_samesite'  => 'Strict'
    ]);
}

// 3. Verify HTTP Request Method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method Not Allowed.', 405);
}

// 4. Validate CSRF Token
if (!function_exists('getallheaders')) {
    function getallheaders() {
        $headers = [];
        foreach ($_SERVER as $name => $value) {
            if (substr($name, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

$headers = getallheaders();
$clientToken = '';
foreach ($headers as $key => $val) {
    if (strcasecmp($key, 'X-CSRF-Token') === 0) {
        $clientToken = trim($val);
        break;
    }
}

if (empty($_SESSION['csrf_token']) || empty($clientToken) || !hash_equals($_SESSION['csrf_token'], $clientToken)) {
    logActivity('SECURITY WARNING', 'CSRF token mismatch or missing.');
    sendResponse(false, 'Security authorization failed. Please refresh the page and try again.', 403);
}

// 5. Spam Mitigation & Multi-Layered Rate Limiting

// Layer A: Honeypot Protection
if (!empty($_POST['website_url'])) {
    logActivity('SPAM DETECTED', 'Honeypot field was populated.');
    sendResponse(false, 'Request flagged as automated spam.', 400);
}

// Get Client IP Address safely
$clientIp = getClientIp();

// Layer B: Session-Based Rate Cooldown (Max 1 submit per 30 seconds)
if (isset($_SESSION['last_submit_time']) && (time() - $_SESSION['last_submit_time'] < 30)) {
    sendResponse(false, 'Please wait 30 seconds before submitting another booking request.', 429);
}

// Initialize database connection
$pdo = null;
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    logActivity('DB ERROR', 'Failed to connect to MySQL: ' . $e->getMessage());
    // Graceful degradation: we will fallback to SMTP email only, but we don't crash
}

// Layer C: IP-Based Database Cooldown (Max 3 submissions per hour)
if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            SELECT COUNT(*) AS count 
            FROM bookings 
            WHERE ip_address = :ip AND created_at > NOW() - INTERVAL 1 HOUR
        ");
        $stmt->execute([':ip' => $clientIp]);
        $ipLogs = $stmt->fetch();
        
        if ($ipLogs && intval($ipLogs['count']) >= 3) {
            logActivity('RATE LIMIT', 'IP address ' . $clientIp . ' exceeded hourly limit.');
            sendResponse(false, 'Hourly submission limit exceeded. Please call us directly to book an appointment.', 429);
        }
    } catch (Exception $e) {
        logActivity('LIMIT CHECK ERROR', $e->getMessage());
    }
}

// Layer D: Cloudflare Turnstile (if keys are provided)
if (defined('TURNSTILE_SECRET_KEY') && !empty(TURNSTILE_SECRET_KEY)) {
    $turnstileToken = isset($_POST['cf-turnstile-response']) ? $_POST['cf-turnstile-response'] : '';
    if (empty($turnstileToken)) {
        // Check raw JSON payload
        $raw_input = file_get_contents('php://input');
        $data_json = json_decode($raw_input, true);
        $turnstileToken = isset($data_json['cf-turnstile-response']) ? $data_json['cf-turnstile-response'] : '';
    }
    
    if (empty($turnstileToken)) {
        sendResponse(false, 'Security verification required. Please check Turnstile.', 400);
    }
    
    $verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    $postData = [
        'secret' => TURNSTILE_SECRET_KEY,
        'response' => $turnstileToken,
        'remoteip' => $clientIp
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $verifyUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    curl_close($ch);
    
    $outcome = json_decode($response, true);
    if (!$outcome || !$outcome['success']) {
        logActivity('TURNSTILE FAIL', 'Turnstile token validation failed.');
        sendResponse(false, 'Security verification verification failed. Please try again.', 400);
    }
}

// 6. Read and Parse Inputs (JSON / Fallback Form POST)
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);
if (empty($data)) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$service = isset($data['service']) ? trim($data['service']) : '';
$date = isset($data['date']) ? trim($data['date']) : '';
$time = isset($data['time']) ? trim($data['time']) : '';
$age = isset($data['age']) ? trim($data['age']) : '';
$notes = isset($data['notes']) ? trim($data['notes']) : '';

// 7. Input Validation & Verification
if (empty($name) || empty($phone) || empty($email) || empty($service) || empty($date) || empty($time) || empty($age)) {
    sendResponse(false, 'Please complete all required fields.');
}

// Full Name: Human-Realistic Unicode Pattern
if (!preg_match('/^[\p{L}\s\'.-]{3,100}$/u', $name)) {
    sendResponse(false, 'Please enter a valid full name (3-100 letters).');
}

// Email: Standard PHP RFC Check
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please enter a valid email address.');
}

// Phone: Matches numbers, spaces, plus, parentheses, hyphens (10-15 chars)
if (!preg_match('/^[0-9+()\s-]{10,15}$/', $phone)) {
    sendResponse(false, 'Please enter a valid phone number (10 to 15 digits).');
}

// Age: Bounds check (1-120)
$age_int = intval($age);
if ($age_int < 1 || $age_int > 120) {
    sendResponse(false, 'Please enter an age between 1 and 120.');
}

// Booking Date: Cannot be in the past
$today = date('Y-m-d');
if ($date < $today) {
    sendResponse(false, 'Appointment date cannot be in the past.');
}

// Escape notes to prevent injection / XSS
$notes_sanitized = htmlspecialchars($notes, ENT_QUOTES, 'UTF-8');

// 8. Record in Database
$db_inserted = false;
if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO bookings (name, phone, email, service, preferred_date, preferred_time, age, notes, ip_address) 
            VALUES (:name, :phone, :email, :service, :preferred_date, :preferred_time, :age, :notes, :ip)
        ");
        
        $db_inserted = $stmt->execute([
            ':name'           => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
            ':phone'          => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
            ':email'          => filter_var($email, FILTER_SANITIZE_EMAIL),
            ':service'        => htmlspecialchars($service, ENT_QUOTES, 'UTF-8'),
            ':preferred_date' => $date,
            ':preferred_time' => $time,
            ':age'            => $age_int,
            ':notes'          => $notes_sanitized,
            ':ip'             => $clientIp
        ]);
    } catch (Exception $e) {
        logActivity('DB INSERT ERROR', $e->getMessage());
        // Fail-safe: we proceed to try sending SMTP email to keep user lead
    }
}

// Record submission time to session rate limiter
$_SESSION['last_submit_time'] = time();

// 9. Deliver Emails via PHPMailer SMTP
$email_sent_to_admin = false;
$email_sent_to_client = false;

require_once __DIR__ . '/phpmailer/Exception.php';
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Create SMTP transporter instances safely
if (defined('SMTP_USER') && !empty(SMTP_USER) && SMTP_USER !== 'booking@yourdomain.com') {
    
    // --- 9A. Send Email details to Admin/Clinic ---
    try {
        $mailAdmin = new PHPMailer(true);
        $mailAdmin->isSMTP();
        $mailAdmin->Host       = SMTP_HOST;
        $mailAdmin->SMTPAuth   = SMTP_AUTH;
        $mailAdmin->Username   = SMTP_USER;
        $mailAdmin->Password   = SMTP_PASS;
        $mailAdmin->SMTPSecure = SMTP_SECURE;
        $mailAdmin->Port       = SMTP_PORT;
        $mailAdmin->CharSet    = 'UTF-8';

        $mailAdmin->setFrom(SMTP_USER, CLINIC_NAME);
        $mailAdmin->addAddress(CLINIC_EMAIL);
        $mailAdmin->addReplyTo($email, $name);

        $mailAdmin->isHTML(true);
        $mailAdmin->Subject = 'New Booking Request - ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        
        // Branded HTML layout template
        $mailAdmin->Body = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #fbf9f8; }
                .header { background-color: #049ca4; color: white; padding: 15px; text-align: center; border-radius: 6px 6px 0 0; font-size: 20px; font-weight: bold; }
                .details { padding: 20px 10px; }
                table { width: 100%; border-collapse: collapse; }
                th { text-align: left; padding: 10px; width: 150px; border-bottom: 1px solid #e5e7eb; color: #6b7280; }
                td { padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: bold; }
                .notes { background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #ff7a00; font-style: italic; }
                .footer { font-size: 12px; color: #9ca3af; text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>New Booking Alert</div>
                <div class='details'>
                    <table>
                        <tr><th>Patient Name</th><td>" . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</td></tr>
                        <tr><th>Age</th><td>$age_int</td></tr>
                        <tr><th>Phone Number</th><td>" . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "</td></tr>
                        <tr><th>Email Address</th><td>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</td></tr>
                        <tr><th>Service Requested</th><td>" . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . "</td></tr>
                        <tr><th>Preferred Date</th><td>" . date('d-M-Y', strtotime($date)) . "</td></tr>
                        <tr><th>Preferred Time</th><td>" . date('h:i A', strtotime($time)) . "</td></tr>
                    </table>";
        if (!empty($notes)) {
            $mailAdmin->Body .= "
                    <p style='margin-top:20px; font-weight:bold; color: #6b7280;'>Patient Notes:</p>
                    <div class='notes'>$notes_sanitized</div>";
        }
        $mailAdmin->Body .= "
                </div>
                <div class='footer'>
                    This request was sent from IP: $clientIp.<br>
                    Database Log: " . ($db_inserted ? "Saved Successfully" : "Failed/Bypassed") . "
                </div>
            </div>
        </body>
        </html>";

        $email_sent_to_admin = $mailAdmin->send();
    } catch (Exception $e) {
        logActivity('SMTP ADMIN FAIL', $mailAdmin->ErrorInfo);
    }

    // --- 9B. Send Confirmation Email to Client ---
    try {
        $mailClient = new PHPMailer(true);
        $mailClient->isSMTP();
        $mailClient->Host       = SMTP_HOST;
        $mailClient->SMTPAuth   = SMTP_AUTH;
        $mailClient->Username   = SMTP_USER;
        $mailClient->Password   = SMTP_PASS;
        $mailClient->SMTPSecure = SMTP_SECURE;
        $mailClient->Port       = SMTP_PORT;
        $mailClient->CharSet    = 'UTF-8';

        $mailClient->setFrom(SMTP_USER, CLINIC_NAME);
        $mailClient->addAddress($email, $name);

        $mailClient->isHTML(true);
        $mailClient->Subject = 'Appointment Request Received - ' . CLINIC_NAME;

        $mailClient->Body = "
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; color: #333333; line-height: 1.6; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff; }
                .header { background-color: #049ca4; color: white; padding: 15px; text-align: center; border-radius: 6px 6px 0 0; font-size: 20px; font-weight: bold; }
                .body-content { padding: 20px 10px; }
                .summary-box { background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #e5e7eb; }
                .btn { display: inline-block; padding: 10px 20px; background-color: #ff7a00; color: white; text-decoration: none; border-radius: 20px; font-weight: bold; margin-top: 10px; }
                .footer { font-size: 11px; color: #9ca3af; text-align: center; margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>" . CLINIC_NAME . "</div>
                <div class='body-content'>
                    <p>Dear " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ",</p>
                    <p>Thank you for requesting an appointment with us. We have received your booking details and our clinical coordinator will contact you shortly to finalize your scheduled time slot.</p>
                    
                    <div class='summary-box'>
                        <strong>Summary of Requested Appointment:</strong>
                        <ul style='list-style-type: none; padding-left: 0;'>
                            <li><strong>Service:</strong> " . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . "</li>
                            <li><strong>Requested Date:</strong> " . date('d-M-Y', strtotime($date)) . "</li>
                            <li><strong>Requested Time:</strong> " . date('h:i A', strtotime($time)) . "</li>
                        </ul>
                    </div>
                    
                    <p><strong>What is Next?</strong><br>
                    Our coordinator will call you within 2 business hours to verify your details and lock in your session slot. If you need immediate assistance or would like to reschedule, feel free to call us directly.</p>
                    
                    <p style='margin-top:25px;'>Warm regards,<br><strong>The PhysioGlides Clinic Team</strong></p>
                </div>
                <div class='footer'>
                    You are receiving this because you submitted a booking request at our clinic site.<br>
                    123 Recovery Street, Medavakkam, Chennai. Phone: +91 98765 43210.
                </div>
            </div>
        </body>
        </html>";

        $email_sent_to_client = $mailClient->send();
    } catch (Exception $e) {
        logActivity('SMTP CLIENT FAIL', $mailClient->ErrorInfo);
    }
}

// 10. Status Response Output (Fail-Safe Implementation Check)
if ($db_inserted || $email_sent_to_admin) {
    $userMsg = 'Appointment request received successfully. Our team will contact you shortly to confirm your slot.';
    if (!$email_sent_to_client && !$email_sent_to_admin) {
        $userMsg .= ' (Confirmation email is pending, but database log completed.)';
    }
    sendResponse(true, $userMsg);
} else {
    // If both database insert failed AND SMTP failed, degrade gracefully and show direct contact links
    sendResponse(false, 'Unable to process your booking request automatically due to server error. Please call us directly at +91 98765 43210 or chat on WhatsApp.', 500);
}

/**
 * Standard HTTP JSON Response Utility
 */
function sendResponse($success, $message, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

/**
 * Extract Client IP Address
 */
function getClientIp() {
    $ip = '127.0.0.1';
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Strip proxies
        $parts = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ip = trim($parts[0]);
    } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '127.0.0.1';
}

/**
 * Secure Logging with Automatic File Rotation
 */
function logActivity($type, $msg) {
    $logDirectory = __DIR__ . '/logs';
    if (!is_dir($logDirectory)) {
        mkdir($logDirectory, 0755, true);
    }
    
    $logFile = $logDirectory . '/error.log';
    
    // Rotate logs if file size exceeds 5MB
    if (file_exists($logFile) && filesize($logFile) > 5 * 1024 * 1024) {
        rename($logFile, $logFile . '.1');
    }
    
    $formattedMsg = sprintf("[%s] [%s] %s\n", date('Y-m-d H:i:s'), $type, $msg);
    error_log($formattedMsg, 3, $logFile);
}
