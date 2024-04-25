-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `created` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `forum` (`id`, `name`, `created`) VALUES
(1,	'Informatique',	'2024-04-25'),
(2,	'Cuisine',	'2024-04-25'),
(3,	'Foot',	'2024-04-25'),
(4,	'Nature',	'2024-04-25'),
(5,	'Cinema',	'2024-04-25');

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `content` text NOT NULL,
  `date` date NOT NULL,
  `sujet_id` int NOT NULL,
  `date_modif` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sujet_id` (`sujet_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sujet_id`) REFERENCES `sujet` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `sujet`;
CREATE TABLE `sujet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `created` date NOT NULL,
  `forum_id` int NOT NULL,
  `is_open` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `forum_id` (`forum_id`),
  CONSTRAINT `sujet_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `sujet` (`id`, `name`, `created`, `forum_id`, `is_open`) VALUES
(1,	'Python',	'2024-04-25',	1,	1),
(2,	'Java',	'2024-04-25',	1,	1),
(3,	'C',	'2024-04-25',	1,	1),
(4,	'Kebab',	'2024-04-25',	2,	1),
(5,	'Pate',	'2024-04-25',	2,	1),
(6,	'légume',	'2024-04-25',	2,	1),
(7,	'Psg',	'2024-04-25',	3,	1),
(8,	'Montagne',	'2024-04-25',	4,	1),
(9,	'Foret',	'2024-04-25',	4,	1),
(10,	'Cinema Français ',	'2024-04-25',	5,	1),
(11,	'Ryan Gosling',	'2024-04-25',	5,	1);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `isAdmin` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `user` (`id`, `name`, `email`, `password`, `isAdmin`) VALUES
(1,	'admin',	'admin@gmail.com',	'admin',	1);

-- 2024-04-25 19:18:35
