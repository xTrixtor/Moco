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
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Charges`
--

LOCK TABLES `Charges` WRITE;
/*!40000 ALTER TABLE `Charges` DISABLE KEYS */;
INSERT INTO `Charges` VALUES (3,'müller',26.93,25),(4,'Globus',5.47,25),(5,'Smyths toys',5.98,25),(6,'Burger',20,26),(7,'Geld auszahlen',50,25),(8,'Mgges',15.37,26),(9,'shisha bar',25,25),(10,'Aldi',69.08,23),(11,'crunchy',7.13,26),(12,'ps Plus',9,25),(13,'classic',83.03,24),(14,'Crunchy ',17,26),(15,'Bk',23.07,26),(16,'Zalando',107.41,25),(17,'Netto',15.28,23),(18,'Netto/Eier/Netto',13.78,23),(19,'Monster hunter',8.93,25),(20,'Netto',20.5,23),(21,'Crunchy',14,26),(22,'Kino',22.5,25),(23,'netto',10.04,23),(24,'Weihnachtsgeschenk',221.9,25),(25,'Marcel geschenk',39.98,25),(26,'behälter+ esn',80.14,23),(27,'19th Burger ',24.03,31),(28,'Parken hd',3.5,30),(29,'Kaffee',56.7,30),(30,'Pizza Zutaten ',34.44,28),(31,'Aldi',37.39,28),(32,'Weihnachtsmarkt',19,31),(34,'EMS',20,30),(35,'Sony',7.98,30),(36,'Twitch',4.49,30),(37,'Mineral',83.39,29),(38,'AIrbnb',39.32,30),(39,'Asiate',17.75,28),(40,'Energy essen Motor',2,31),(41,'Food brother',18.5,31),(42,'Bäckerei ',7,31),(43,'Burgerking',3,31),(44,'aldi',57.06,28),(45,'19th',22.99,31),(46,'Auto waschen',5,30),(47,'Döner WEB',24,31),(48,'Käfertal',80.58,29),(49,'Silvester',15,28),(50,'Bk',13.98,31),(51,'Fifa',14,30),(54,'Bäckerei',5.27,43),(55,'Classic',80.06,42),(56,'Bargeld (Tierarzt)',20,45),(57,'Rewe',5.56,41),(58,'Silvester',15,41),(59,'Aldi',14.5,41),(60,'Ps plus',8.99,43),(62,'Gate99',30,43),(63,'Aldi',9.9,41),(64,'Pizza',32.86,44),(65,'Go Asia',16.01,41),(66,'Parkhaus',3,44),(67,'Senju',28,44),(69,'aldi',46,41),(70,'Eier',1.75,41),(71,'Götz-Mann ',66.66,42),(72,'Sinsheim 24/7',27.33,42),(73,'Pizza ',28.05,44),(74,'Rewe cola',10.1,41),(75,'Subway',10.29,43),(76,'Aldi st.le',9.51,41),(77,'Aldi',36.5,41),(78,'Rewe Rau',8,41),(79,'Leon Bday',13.67,43),(80,'Mick abo',5,43),(81,'Patron',4.75,43),(85,'a',250,49),(86,'t',150,50),(87,'tr',150,51),(96,'Netto -8 euro',4,58),(97,'Netto',15,58),(98,'Netto',4,58),(99,'Apotheke',17,58),(100,'Apotheke',29,58),(101,'netto',6.02,58),(102,'Döner',10.5,60),(103,'Pizza',35,60),(104,'Aldi',32.4,58),(105,'Netto',10.64,58),(106,'Strafzettel',25,61),(107,'Döner',10,60),(108,'Edeka',6.83,58),(109,'Classic',74,59),(110,'Döner',9.5,60),(111,'bk',15,60),(112,'netto',13,58),(113,'Nintendo',23,61),(115,'schere',3.5,58),(116,'aldi',31.34,58),(117,'pizza',27.5,60),(118,'HotPot',35,60),(119,'Billlard',12,60),(120,'Minera',78.15,59),(121,'sirup',29.17,58),(122,'amazon',8.99,61),(125,'a',250,63),(126,'a',150,64),(127,'a',150,65),(128,'a',100,66),(129,'a',250,67),(130,'a',150,68),(131,'asdf',150,69),(132,'asdf',100,70),(133,'döner',9.5,60),(134,'Aldi',40.2,58),(136,'bank11',19.5,61),(137,'Flixbus',13.98,61),(138,'Parken',1.05,61),(139,'wiso',25.11,61);
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

-- Dump completed on 2025-02-26 18:10:16
