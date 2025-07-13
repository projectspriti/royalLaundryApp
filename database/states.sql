CREATE TABLE `states` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `country_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `state_name` (`name`)
);

INSERT INTO `states` VALUES (1,'Andaman Nicobar',1),(2,'Andhra Pradesh',1),(3,'Arunachal Pradesh',1),(4,'Assam',1),(5,'Bihar',1),(6,'Chandigarh',1),(7,'Chhattisgarh',1),(8,'Dadra & Nagar Haveli',1),(9,'Daman & Diu',1),(10,'Delhi',1),(11,'Goa',1),(12,'Gujarat',1),(13,'Haryana',1),(14,'Himachal Pradesh',1),(15,'Jammu & Kashmir',1),(16,'Jharkhand',1),(17,'Karnataka',1),(18,'Kerala',1),(19,'Lakshdweep',1),(20,'Madhya Pradesh',1),(21,'Maharashtra',1),(22,'Manipur',1),(23,'Meghalaya',1),(24,'Mizoram',1),(25,'Nagaland',1),(26,'Orissa',1),(27,'Pondicherry',1),(28,'Punjab',1),(29,'Rajasthan',1),(30,'Sikkim',1),(31,'Tamil Nadu',1),(32,'Tripura',1),(33,'Uttar Pradesh',1),(34,'Uttaranchal',1),(35,'West Bengal',1);