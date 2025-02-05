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
-- Table structure for table `Budgets`
--

DROP TABLE IF EXISTS `Budgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Budgets` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Limit` double NOT NULL,
  `UserId` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Budgets`
--

LOCK TABLES `Budgets` WRITE;
/*!40000 ALTER TABLE `Budgets` DISABLE KEYS */;
INSERT INTO `Budgets` VALUES (1,'Haushalt',300,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(2,'Tanken',150,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(3,'Aktivität',100,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(4,'Luxus',100,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(5,'Lebensmittel',300,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(6,'Tanken',150,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(7,'Fun',100,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(8,'Essen Gehen',100,'ce8b7be8-9b8d-4286-9c2a-bacbddd8288a'),(10,'Lebensmittel',250,'ffc028fc-5c14-4584-841c-bc7344b8aab8');
/*!40000 ALTER TABLE `Budgets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 23:31:48
