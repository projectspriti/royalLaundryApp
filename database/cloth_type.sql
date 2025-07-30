cloth_type, CREATE TABLE `cloth_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

insert into laundry.cloth_type(name, description) values("T-Shirt", "Any T-shirt made of the common tshirt materials");
insert into laundry.cloth_type(name, description) values("Jacket", "All jackets except those made of leather");