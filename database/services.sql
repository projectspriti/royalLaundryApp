services, CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) DEFAULT 'DEFAULT',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

insert into laundry.services(name, description) values("Wash and Fold", "Wash with detergent, air dry, press and fold");
insert into laundry.services(name, description) values("Ironing/Pressing", "Only Iron pressing");