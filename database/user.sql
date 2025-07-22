CREATE TABLE users (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    -- username VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(15) NOT NULL,
    `full_name` VARCHAR(100) NOT NULL,
    `address` varchar(255),
    `is_active` BOOLEAN DEFAULT true,
    `last_login_date` DATETIME,
    `created_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modified_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `reset_password_token` VARCHAR(255),
    `reset_password_expires` DATETIME,
    `email_verified` BOOLEAN DEFAULT false,
    `verification_token` VARCHAR(255),
    `account_locked` BOOLEAN DEFAULT false,
    `failed_login_attempts` INT DEFAULT 0,
    `pincode` CHAR(6) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_phone ON users(phone);