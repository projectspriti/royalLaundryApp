CREATE TABLE `user_otps` (
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`,`purpose`),
  UNIQUE KEY `phone_UNIQUE` (`phone`,`purpose`)
);

INSERT INTO `user_otps` VALUES (1,4,'mkkhan6363@gmail.com',NULL,'307627','password_reset',0,0,'2025-06-01 01:15:43','2025-06-01 01:05:43'),(2,1,'vyosim.mohammed.k@gmail.com',NULL,'488033','password_reset',1,0,'2025-06-01 01:16:27','2025-06-01 01:06:27'),(3,1,'vyosim.mohammed.k@gmail.com',NULL,'913748','registration',1,0,'2025-06-01 02:23:20','2025-06-01 02:13:20'),(4,5,'mkkhan6363@gmail.com',NULL,'199589','registration',0,0,'2025-07-03 15:27:37','2025-07-03 15:17:37'),(5,6,'mkkhan6390@gmail.com',NULL,'369964','registration',0,0,'2025-07-03 15:30:41','2025-07-03 15:20:41');