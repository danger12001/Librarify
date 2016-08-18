CREATE TABLE IF NOT EXISTS `info`(
  `id` INT(11) AUTO_INCREMENT NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `surname` VARCHAR (20) NOT NULL,
  `address` VARCHAR (20) NOT NULL,
  `cell_number` text(10) NOT  NULL,
  `ID_number` text(13) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);
