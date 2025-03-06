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
-- Table structure for table `MonthlyBudgets`
--

DROP TABLE IF EXISTS `MonthlyBudgets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MonthlyBudgets` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Limit` double NOT NULL,
  `CostInspectionId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_MonthlyBudgets_CostInspectionId` (`CostInspectionId`),
  CONSTRAINT `FK_MonthlyBudgets_CostInspections_CostInspectionId` FOREIGN KEY (`CostInspectionId`) REFERENCES `CostInspections` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MonthlyBudgets`
--

LOCK TABLES `MonthlyBudgets` WRITE;
/*!40000 ALTER TABLE `MonthlyBudgets` DISABLE KEYS */;
INSERT INTO `MonthlyBudgets` VALUES (23,'Lebensmittel',300,10),(24,'Tanken',150,10),(25,'Fun',100,10),(26,'Essen Gehen',100,10),(27,'Lebensmittel',250,12),(28,'Lebensmittel',300,13),(29,'Tanken',150,13),(30,'Fun',100,13),(31,'Essen Gehen',100,13),(41,'Lebensmittel',300,16),(42,'Tanken',150,16),(43,'Fun',100,16),(44,'Essen Gehen',100,16),(45,'Bargeld',150,16),(49,'Lebensmittel',250,18),(50,'Tanken',150,18),(51,'Unternehmungen + Essen',150,18),(58,'Lebensmittel',250,21),(59,'Tanken',150,21),(60,'Unternehmungen + Essen',150,21),(61,'Sonstiges',100,21),(63,'Lebensmittel',250,23),(64,'Tanken',150,23),(65,'Unternehmungen + Essen',150,23),(66,'Sonstiges',100,23),(67,'Lebensmittel',250,24),(68,'Tanken',150,24),(69,'Unternehmungen + Essen',150,24),(70,'Sonstiges',100,24);
/*!40000 ALTER TABLE `MonthlyBudgets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-26 18:10:17
