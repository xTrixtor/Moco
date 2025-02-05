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
-- Table structure for table `Charges`
--

DROP TABLE IF EXISTS `Charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Charges` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` double NOT NULL,
  `MonthlyBudgetId` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_Charges_MonthlyBudgetId` (`MonthlyBudgetId`),
  CONSTRAINT `FK_Charges_MonthlyBudgets_MonthlyBudgetId` FOREIGN KEY (`MonthlyBudgetId`) REFERENCES `MonthlyBudgets` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Charges`
--

LOCK TABLES `Charges` WRITE;
/*!40000 ALTER TABLE `Charges` DISABLE KEYS */;
INSERT INTO `Charges` VALUES (3,'müller',26.93,25),(4,'Globus',5.47,25),(5,'Smyths toys',5.98,25),(6,'Burger',20,26),(7,'Geld auszahlen',50,25),(8,'Mgges',15.37,26),(9,'shisha bar',25,25),(10,'Aldi',69.08,23),(11,'crunchy',7.13,26),(12,'ps Plus',9,25),(13,'classic',83.03,24),(14,'Crunchy ',17,26),(15,'Bk',23.07,26),(16,'Zalando',107.41,25),(17,'Netto',15.28,23),(18,'Netto/Eier/Netto',13.78,23),(19,'Monster hunter',8.93,25),(20,'Netto',20.5,23),(21,'Crunchy',14,26),(22,'Kino',22.5,25),(23,'netto',10.04,23),(24,'Weihnachtsgeschenk',221.9,25),(25,'Marcel geschenk',39.98,25),(26,'behälter+ esn',80.14,23),(27,'19th Burger ',24.03,31),(28,'Parken hd',3.5,30),(29,'Kaffee',56.7,30),(30,'Pizza Zutaten ',34.44,28),(31,'Aldi',37.39,28),(32,'Weihnachtsmarkt',12,31),(34,'EMS',20,30),(35,'Sony',7.98,30),(36,'Twitch',4.49,30),(37,'Mineral',83.39,29),(38,'AIrbnb',39.32,30);
/*!40000 ALTER TABLE `Charges` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-05 23:31:50
