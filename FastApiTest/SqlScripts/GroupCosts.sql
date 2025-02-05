-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 168.119.127.35    Database: moco
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `GroupCosts`
--

DROP TABLE IF EXISTS `GroupCosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GroupCosts` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GroupCosts`
--

LOCK TABLES `GroupCosts` WRITE;
/*!40000 ALTER TABLE `GroupCosts` DISABLE KEYS */;
INSERT INTO `GroupCosts` VALUES (1,'Wohnen','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(2,'Investieren','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(3,'Auto','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(4,'Abonnements','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(5,'Auto','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(6,'Investieren','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(7,'Versicherung','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(8,'Wohnen','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(9,'Allgemein','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(12,'Sparziel','ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(13,'Wohnen','ffc028fc-5c14-4584-841c-bc7344b8aab8'),(14,'Auto','ffc028fc-5c14-4584-841c-bc7344b8aab8');
/*!40000 ALTER TABLE `GroupCosts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 23:31:52
