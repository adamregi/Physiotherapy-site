-- MySQL Database Schema for PhysioGlides Booking System
-- You can import this file via phpMyAdmin in Hostinger

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `service` VARCHAR(100) NOT NULL,
  `preferred_date` DATE NOT NULL,
  `preferred_time` TIME NOT NULL,
  `age` INT NOT NULL,
  `notes` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
