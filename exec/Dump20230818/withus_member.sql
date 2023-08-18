-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 43.201.82.80    Database: withus
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

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
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login_type` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,NULL,NULL,'337sally@naver.com','kakao','ㅇㅁㅇ',NULL),(23,NULL,NULL,NULL,'guest','하이',NULL),(24,NULL,NULL,NULL,'guest','건들면물어요',NULL),(25,NULL,NULL,NULL,'guest','이젠 안녕',NULL),(26,NULL,NULL,NULL,'guest','이젠 안녕',NULL),(44,NULL,NULL,NULL,'guest','닉네임하이',NULL),(45,NULL,NULL,NULL,'guest','돌멩이',NULL),(46,NULL,NULL,NULL,'guest','돌멩이',NULL),(47,NULL,NULL,NULL,'guest','돌멩이',NULL),(48,NULL,NULL,NULL,'guest','돌멩이',NULL),(49,NULL,NULL,NULL,'guest','돌메잉',NULL),(50,NULL,NULL,NULL,'guest','돌메잉',NULL),(51,NULL,NULL,NULL,'guest','돌메잉',NULL),(52,NULL,NULL,NULL,'guest','돌메잉',NULL),(53,NULL,NULL,NULL,'guest','돌멩이',NULL),(54,NULL,NULL,NULL,'guest','돌멩이',NULL),(55,NULL,NULL,NULL,'guest','돌멩이',NULL),(56,NULL,NULL,NULL,'guest','돌멩이',NULL),(60,NULL,NULL,NULL,'guest','a',NULL),(77,NULL,NULL,NULL,'guest','안녕안녕',NULL),(78,NULL,NULL,NULL,'guest','ez=',NULL),(79,NULL,NULL,NULL,'guest','김예빈',NULL);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 10:37:20
