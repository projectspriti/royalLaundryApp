CREATE TABLE `pricing` (
  `pricing_id` int NOT NULL AUTO_INCREMENT,
  `service_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `cloth_id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pricing_id`),
  KEY `service_id_idx` (`service_id`),
  KEY `cloth_id_idx` (`cloth_id`),
  KEY `vendor_id_idx` (`vendor_id`),
  CONSTRAINT `cloth_id` FOREIGN KEY (`cloth_id`) REFERENCES `cloth_type` (`cloth_id`),
  CONSTRAINT `service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`),
  CONSTRAINT `vendor_id` FOREIGN KEY (`vendor_id`) REFERENCES `vendor_details` (`vendor_id`)
);