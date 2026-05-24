<?php
/**
 * PhysioGlides - Appointment Booking Backend
 * Safe and secure booking script designed for Hostinger PHP/MySQL environment.
 */

// Error reporting - disable in production, enable for troubleshooting
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// 1. Database Configuration Settings
// Change these settings based on your Hostinger MySQL details:
define('DB_HOST', 'localhost');
define('DB_USER', 'your_mysql_username'); 
define('DB_PASS', 'your_mysql_password');
define('DB_NAME', 'your_database_name');

// 2. Email Notification Settings
// Change this to your clinic's business email address:
define('CLINIC_EMAIL', 'hello@physioglides.com');
define('EMAIL_SUBJECT', 'New Appointment Booking Request - PhysioGlides');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method. Only POST is allowed.', 405);
}

// Read raw JSON input
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

// Fallback to standard $_POST if JSON payload is empty (e.g. standard form submit)
if (empty($data)) {
    $data = $_POST;
}

// Validate input fields
$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$service = isset($data['service']) ? trim($data['service']) : '';
$date = isset($data['date']) ? trim($data['date']) : '';
$time = isset($data['time']) ? trim($data['time']) : '';
$age = isset($data['age']) ? trim($data['age']) : '';
$notes = isset($data['notes']) ? trim($data['notes']) : '';

// Crucial fields check
if (empty($name) || empty($phone) || empty($email) || empty($service) || empty($date) || empty($time) || empty($age)) {
    sendResponse(false, 'Please complete all required fields.');
}

// Validate Email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please enter a valid email address.');
}

// Validate Phone Number (Allow numbers, spaces, parentheses, dashes, plus sign; 10-15 chars)
if (!preg_match('/^[0-9+()\s-]{10,15}$/', $phone)) {
    sendResponse(false, 'Please enter a valid phone number (10 to 15 digits).');
}

// Validate Age
$age_int = intval($age);
if ($age_int < 1 || $age_int > 120) {
    sendResponse(false, 'Please enter a valid age between 1 and 120.');
}

// Validate Date (Ensure booking date is not in the past)
$today = date('Y-m-d');
if ($date < $today) {
    sendResponse(false, 'Appointment date cannot be in the past.');
}

// Initialize database connection
$db_connected = false;
$pdo = null;

try {
    // Only attempt database connection if credentials have been updated from placeholder values
    if (DB_USER !== 'your_mysql_username' && DB_NAME !== 'your_database_name') {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        $db_connected = true;
    }
} catch (PDOException $e) {
    // We log error internally if needed, but do not show details to user for security
    // Continue with mail sending even if DB connection fails, so that the lead is not lost!
}

// 3. Insert into Database if DB is configured
$db_inserted = false;
if ($db_connected && $pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO bookings (name, phone, email, service, preferred_date, preferred_time, age, notes) 
            VALUES (:name, :phone, :email, :service, :preferred_date, :preferred_time, :age, :notes)
        ");
        
        $db_inserted = $stmt->execute([
            ':name'           => htmlspecialchars($name, ENT_QUOTES, 'UTF-8'),
            ':phone'          => htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
            ':email'          => filter_var($email, FILTER_SANITIZE_EMAIL),
            ':service'        => htmlspecialchars($service, ENT_QUOTES, 'UTF-8'),
            ':preferred_date' => $date,
            ':preferred_time' => $time,
            ':age'            => $age_int,
            ':notes'          => htmlspecialchars($notes, ENT_QUOTES, 'UTF-8')
        ]);
    } catch (Exception $e) {
        // DB insert failed. We will still attempt to send the email
    }
}

// 4. Send Email Notification
$email_sent = false;
if (!empty(CLINIC_EMAIL) && CLINIC_EMAIL !== 'hello@physioglides.com') {
    // Clean user inputs for email safety
    $safe_name = strip_tags($name);
    $safe_email = filter_var($email, FILTER_SANITIZE_EMAIL);
    $safe_phone = strip_tags($phone);
    $safe_service = strip_tags($service);
    $safe_notes = nl2br(htmlspecialchars($notes, ENT_QUOTES, 'UTF-8'));
    
    // HTML Email template
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: PhysioGlides Booking <noreply@" . $_SERVER['HTTP_HOST'] . ">\r\n";
    $headers .= "Reply-To: $safe_name <$safe_email>\r\n";
    
    $body = "
    <html>
    <head>
        <title>New Booking Request</title>
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
            <div class='header'>PhysioGlides - Booking Details</div>
            <div class='details'>
                <table>
                    <tr><th>Patient Name</th><td>$safe_name</td></tr>
                    <tr><th>Age</th><td>$age_int</td></tr>
                    <tr><th>Phone Number</th><td>$safe_phone</td></tr>
                    <tr><th>Email Address</th><td><a href='mailto:$safe_email'>$safe_email</a></td></tr>
                    <tr><th>Requested Service</th><td>$safe_service</td></tr>
                    <tr><th>Preferred Date</th><td>" . date('d-M-Y', strtotime($date)) . "</td></tr>
                    <tr><th>Preferred Time</th><td>" . date('h:i A', strtotime($time)) . "</td></tr>
                </table>";
                
    if (!empty($notes)) {
        $body .= "
                <p style='margin-top:20px; font-weight:bold; color: #6b7280;'>Additional Patient Notes:</p>
                <div class='notes'>$safe_notes</div>";
    }
    
    $body .= "
            </div>
            <div class='footer'>
                This booking has been automatically recorded by the PhysioGlides website form.<br>
                Database Save Status: " . ($db_inserted ? "Successfully Logged in Database" : "Skipped/Failed Database Log") . "
            </div>
        </div>
    </body>
    </html>";
    
    $email_sent = mail(CLINIC_EMAIL, EMAIL_SUBJECT, $body, $headers);
}

// 5. Send proper status response back to front-end
if ($db_inserted || $email_sent) {
    sendResponse(true, 'Appointment request received. Our team will contact you shortly to confirm your booking.');
} else {
    // If db config was not set, and email wasn't set or failed, but details are valid.
    // In mock testing, we'll allow true if inputs are valid, but notify the admin.
    if (DB_USER === 'your_mysql_username' && CLINIC_EMAIL === 'hello@physioglides.com') {
        sendResponse(true, 'Validation successful. Please configure your Hostinger database and email in booking.php to receive submissions.');
    } else {
        sendResponse(false, 'Unable to process booking request due to server configuration. Please try calling us directly.');
    }
}

/**
 * Sends JSON response and exits
 */
function sendResponse($success, $message, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}
