-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               9.4.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table busbeacon.bus
CREATE TABLE IF NOT EXISTS `bus` (
  `bus_id` int unsigned NOT NULL AUTO_INCREMENT,
  `brand` varchar(64) NOT NULL DEFAULT 'Unknown',
  `model` varchar(64) NOT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '/images/defaultBus.png',
  `year` year NOT NULL,
  `capacity` smallint NOT NULL,
  `ac` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`bus_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table busbeacon.bus: ~3 rows (approximately)
INSERT INTO `bus` (`bus_id`, `brand`, `model`, `image_path`, `year`, `capacity`, `ac`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Mercedes-Benz', 'Citaro', '/images/bus1.png', '2015', 50, '0', '2026-06-14 22:59:44', '2026-06-17 00:47:44', NULL),
	(2, 'Volvo', ' B13R', '/images/bus2.png', '2020', 72, '1', '2026-06-14 22:59:45', '2026-06-16 20:03:26', NULL),
	(3, 'IVECO', 'STREET-WAY', '/images/bus3.png', '2012', 47, '0', '2026-06-14 22:59:46', '2026-06-05 17:42:28', NULL);

-- Dumping structure for table busbeacon.route
CREATE TABLE IF NOT EXISTS `route` (
  `route_id` int unsigned NOT NULL AUTO_INCREMENT,
  `bus_id` int unsigned NOT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `departure_time` datetime DEFAULT NULL,
  `arrival_time` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`route_id`) USING BTREE,
  KEY `fk_route_bus` (`bus_id`),
  CONSTRAINT `fk_route_bus` FOREIGN KEY (`bus_id`) REFERENCES `bus` (`bus_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table busbeacon.route: ~5 rows (approximately)
INSERT INTO `route` (`route_id`, `bus_id`, `name`, `departure_time`, `arrival_time`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 1, 'Novi Pazar - Kraljevo - Beograd', '2026-06-05 17:44:14', '2026-06-05 19:40:15', '2026-06-17 03:58:05', '2026-06-18 01:41:56', NULL),
	(2, 1, 'Beograd - Pancevo - Novi Sad -Subotica', '2026-06-05 17:44:55', '2026-06-17 21:30:06', '2026-06-17 03:58:08', '2026-06-17 03:58:09', NULL),
	(3, 2, 'Nis - Krusevac - Kragujevac - Beograd', '2026-06-05 17:45:27', '2026-06-05 18:20:29', '2026-06-17 03:58:11', '2026-06-17 03:58:12', NULL),
	(4, 3, 'Novi Pazar - Kraljevo - Krusevac - Nis - Leskovac', '2026-07-17 19:51:15', '2026-06-17 21:30:08', NULL, NULL, NULL),
	(19, 1, 'Kragujevac - Leskovac - Pancevo', '2026-07-22 15:12:00', '2026-07-22 19:12:00', '2026-06-18 05:26:39', NULL, NULL);

-- Dumping structure for table busbeacon.route_station
CREATE TABLE IF NOT EXISTS `route_station` (
  `route_station_id` int unsigned NOT NULL AUTO_INCREMENT,
  `route_id` int unsigned NOT NULL DEFAULT '0',
  `station_id` int unsigned NOT NULL DEFAULT '0',
  `station_order` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`route_station_id`) USING BTREE,
  KEY `fk_route_stations_route` (`route_id`),
  KEY `fk_route_stations_station` (`station_id`),
  CONSTRAINT `fk_route_stations_route` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_route_stations_station` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table busbeacon.route_station: ~14 rows (approximately)
INSERT INTO `route_station` (`route_station_id`, `route_id`, `station_id`, `station_order`) VALUES
	(38, 2, 1, 1),
	(39, 2, 7, 2),
	(40, 2, 2, 3),
	(41, 2, 6, 4),
	(42, 3, 3, 1),
	(43, 3, 8, 2),
	(44, 3, 4, 3),
	(45, 3, 1, 4),
	(66, 1, 10, 1),
	(67, 1, 9, 2),
	(68, 1, 1, 3),
	(117, 19, 4, 1),
	(118, 19, 5, 2),
	(119, 19, 7, 3);

-- Dumping structure for table busbeacon.station
CREATE TABLE IF NOT EXISTS `station` (
  `station_id` int unsigned NOT NULL AUTO_INCREMENT,
  `city` varchar(50) DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `gates` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`station_id`),
  UNIQUE KEY `adress` (`address`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table busbeacon.station: ~10 rows (approximately)
INSERT INTO `station` (`station_id`, `city`, `address`, `gates`, `created_at`, `updated_at`, `deleted_at`) VALUES
	(1, 'Beograd', 'Železnička 4', 10, '2026-06-05 17:47:22', '2026-06-17 00:52:15', NULL),
	(2, 'Novi Sad', 'Bulevar Jaše Tomića 6', 8, '2026-06-05 17:48:03', '2026-06-05 17:48:04', NULL),
	(3, 'Niš', 'Bulevar 12. februara', 9, '2026-06-05 17:48:44', '2026-06-05 17:48:45', NULL),
	(4, 'Kragujevac', 'Šumadijska 8', 8, '2026-06-05 17:49:04', '2026-06-05 17:49:04', NULL),
	(5, 'Leskovac', 'Vilema Pušmana 33', 7, '2026-06-05 17:49:43', '2026-06-05 17:49:43', NULL),
	(6, 'Subotica', 'Senćanski put 23', 7, '2026-06-05 17:50:20', '2026-06-05 17:50:21', NULL),
	(7, 'Pančevo', 'Vojvode Radomira Putnika 33', 3, '2026-06-05 17:50:48', '2026-06-05 17:50:48', NULL),
	(8, 'Kruševac', 'Jug Bogdanova 15', 5, '2026-06-05 17:52:08', '2026-06-05 17:52:09', NULL),
	(9, 'Kraljevo', 'Oktobarskih žrtava 18', 6, '2026-06-05 17:52:10', '2026-06-17 01:13:36', NULL),
	(10, 'Novi Pazar', 'Omladinska 9', 2, '2026-06-05 17:52:39', '2026-06-05 17:52:39', NULL);

-- Dumping structure for table busbeacon.ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `ticket_id` int unsigned NOT NULL AUTO_INCREMENT,
  `route_id` int unsigned NOT NULL,
  `to_station_id` int unsigned NOT NULL,
  `from_station_id` int unsigned NOT NULL,
  `trip_type` enum('One-Way','Round-Trip') DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `ticket_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `travel_date_end` date DEFAULT NULL,
  `travel_date_start` date DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  UNIQUE KEY `qr_code` (`ticket_number`) USING BTREE,
  KEY `fk_ticket_route` (`route_id`),
  KEY `fk_ticket_from_station` (`from_station_id`),
  KEY `fk_ticket_to_station` (`to_station_id`),
  CONSTRAINT `fk_ticket_from_station` FOREIGN KEY (`from_station_id`) REFERENCES `station` (`station_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_route` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_to_station` FOREIGN KEY (`to_station_id`) REFERENCES `station` (`station_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table busbeacon.ticket: ~4 rows (approximately)
INSERT INTO `ticket` (`ticket_id`, `route_id`, `to_station_id`, `from_station_id`, `trip_type`, `price`, `ticket_number`, `travel_date_end`, `travel_date_start`, `created_at`, `deleted_at`, `updated_at`) VALUES
	(3, 3, 1, 8, 'One-Way', 1500.00, '4956930861', '3333-03-31', '2222-02-22', '2026-06-17 20:20:56', NULL, NULL),
	(4, 2, 7, 1, 'Round-Trip', 500.00, '2598469182', '3333-03-31', '2222-02-22', '2026-06-17 20:23:07', NULL, NULL),
	(5, 4, 5, 3, 'Round-Trip', 750.00, '5639759438', '3333-03-31', '2222-02-22', '2026-06-17 20:27:20', NULL, NULL),
	(14, 1, 9, 10, 'One-Way', 500.00, '8816789070', '3333-03-31', '2222-02-22', '2026-06-18 05:24:39', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
