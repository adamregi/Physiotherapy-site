<?php
/**
 * PhysioGlides - Database Maintenance & IP Pruning
 * Safe data retention management suitable for GDPR/privacy compliance.
 * Deletes booking logs and IP metadata older than 90 days.
 */

// 1. Load Configurations & Verify File Availability
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Configuration file missing.']);
    exit;
}
require_once $configFile;

// 2. Validate Security Authorization Token (if run via browser/HTTP request)
if (php_sapi_name() !== 'cli') {
    header('Content-Type: application/json; charset=UTF-8');
    
    $token = isset($_GET['token']) ? trim($_GET['token']) : '';
    if (empty($token) || !hash_equals(CLEANUP_TOKEN, $token)) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Access denied. Invalid cleanup token.']);
        exit;
    }
}

// 3. Execute Database Connection & Pruning Action
try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // SQL statement to clean up data older than 90 days
    $stmt = $pdo->prepare("DELETE FROM bookings WHERE created_at < NOW() - INTERVAL 90 DAY");
    $stmt->execute();
    $rowsAffected = $stmt->rowCount();
    
    $msg = "Database cleanup execution completed. Rows pruned: " . $rowsAffected;
    
    // Log cleanup status internally
    error_log("[" . date('Y-m-d H:i:s') . "] CLEANUP: Success. Rows deleted: " . $rowsAffected . "\n", 3, __DIR__ . '/logs/error.log');
    
    if (php_sapi_name() === 'cli') {
        echo $msg . "\n";
    } else {
        echo json_encode(['success' => true, 'message' => $msg]);
    }
    
} catch (PDOException $e) {
    $errorMsg = "Database cleanup failed: " . $e->getMessage();
    
    // Log exception details
    error_log("[" . date('Y-m-d H:i:s') . "] CLEANUP ERROR: " . $e->getMessage() . "\n", 3, __DIR__ . '/logs/error.log');
    
    if (php_sapi_name() === 'cli') {
        fwrite(STDERR, $errorMsg . "\n");
        exit(1);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Internal server error during database prune.']);
        exit;
    }
}
