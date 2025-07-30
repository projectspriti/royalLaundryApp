user_otps, CREATE TABLE `user_otps` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `otp_code` varchar(10) DEFAULT NULL,
  `purpose` enum('registration','login','password_reset') DEFAULT 'registration',
  `is_used` tinyint(1) DEFAULT '0',
  `attempts` int DEFAULT '0',
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `usertype` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`,`purpose`,`usertype`),
  UNIQUE KEY `phone_UNIQUE` (`phone`,`purpose`,`usertype`)
);