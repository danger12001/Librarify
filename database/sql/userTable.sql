CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `registered` tinyint(1) NOT NULL,
  `one-time-pin` INT(4),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
)
