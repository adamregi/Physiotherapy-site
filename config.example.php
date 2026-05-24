<?php
/**
 * PhysioGlides Configuration Settings (Template)
 * Rename this file to config.php and fill in your actual credentials.
 */

// Explicit Timezone Setup
date_default_timezone_set('Asia/Kolkata');

// Database Settings
define('DB_HOST', '127.0.0.1'); // Hostinger MySQL server hostname
define('DB_NAME', 'physioglides_db');
define('DB_USER', 'db_user_username');
define('DB_PASS', 'db_user_password');

// SMTP Settings for Deliverability
define('SMTP_HOST', 'smtp.hostinger.com'); // e.g., smtp.hostinger.com, smtp.zoho.com, or smtp.brevo.com
define('SMTP_PORT', 465); // 465 for SSL/TLS, 587 for STARTTLS
define('SMTP_USER', 'booking@yourdomain.com'); // Authentic SMTP mailbox username
define('SMTP_PASS', 'smtp_mailbox_password');
define('SMTP_SECURE', 'ssl'); // 'ssl' or 'tls'
define('SMTP_AUTH', true);

// Clinic / Admin Notifications
define('CLINIC_NAME', 'PhysioGlides Physiotherapy Clinic');
define('CLINIC_EMAIL', 'hello@yourdomain.com'); // Notifications sent here

// Cloudflare Turnstile Spam Protection
// Get your keys from Cloudflare dashboard (under Turnstile)
define('TURNSTILE_SITE_KEY', ''); // Insert site key to enable
define('TURNSTILE_SECRET_KEY', ''); // Insert secret key to enable

// Security & Database Maintenance Settings
define('CLEANUP_TOKEN', 'generate_a_random_token_here_for_cron_jobs');
