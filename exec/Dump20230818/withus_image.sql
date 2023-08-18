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
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `img_id` bigint NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `saved_at` varchar(255) DEFAULT NULL,
  `album_id` bigint DEFAULT NULL,
  PRIMARY KEY (`img_id`),
  KEY `FKklgd5pxhpuh3nwik115myord` (`album_id`),
  CONSTRAINT `FKklgd5pxhpuh3nwik115myord` FOREIGN KEY (`album_id`) REFERENCES `album` (`album_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (17,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000031.png','2023-08-18T00:43:58.194812',2),(18,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000032.png','2023-08-18T00:43:58.294520',2),(19,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000033.png','2023-08-18T00:43:58.316540',2),(20,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000034.png','2023-08-18T00:43:58.335195',2),(21,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000035.png','2023-08-18T00:43:58.353509',2),(37,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000221.png','2023-08-18T00:48:03.172696',2),(38,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000222.png','2023-08-18T00:48:03.196603',2),(39,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000223.png','2023-08-18T00:48:03.215695',2),(40,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000224.png','2023-08-18T00:48:03.244770',2),(41,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000225.png','2023-08-18T00:48:03.266205',2),(71,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000421.png','2023-08-18T00:53:17.263561',2),(72,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000422.png','2023-08-18T00:53:17.282102',2),(73,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000423.png','2023-08-18T00:53:17.298148',2),(74,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000424.png','2023-08-18T00:53:17.314542',2),(75,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000425.png','2023-08-18T00:53:17.330857',2),(90,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000761.png','2023-08-18T01:14:10.370573',2),(91,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000762.png','2023-08-18T01:14:10.391296',2),(92,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000763.png','2023-08-18T01:14:10.410346',2),(93,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000764.png','2023-08-18T01:14:10.431122',2),(94,'https://s3.ap-northeast-2.amazonaws.com/withus.bucket/0000765.png','2023-08-18T01:14:10.451629',2);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
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
