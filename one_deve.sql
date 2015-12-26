-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: onestep_development
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.12.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `trackable_id` int(11) DEFAULT NULL,
  `trackable_type` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_activities_on_user_id` (`user_id`),
  KEY `index_activities_on_course_id` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_cases`
--

DROP TABLE IF EXISTS `basic_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basic_cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `main_desc` text,
  `detail_desc` text,
  `treat_desc` text,
  `now_desc` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `process` varchar(255) DEFAULT NULL,
  `has_reply` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_cases`
--

LOCK TABLES `basic_cases` WRITE;
/*!40000 ALTER TABLE `basic_cases` DISABLE KEYS */;
INSERT INTO `basic_cases` VALUES (1,NULL,NULL,NULL,NULL,'2015-12-20 12:09:33','2015-12-20 12:09:33',NULL,1,1,NULL,NULL,0),(2,NULL,NULL,NULL,NULL,'2015-12-20 12:11:29','2015-12-20 12:11:29',NULL,2,1,NULL,NULL,0),(3,'冠心病','高血压多年','','better','2015-12-20 13:49:08','2015-12-21 21:55:05',NULL,3,1,2,'fee',1),(4,'谭测试2','测试2','呜呜呜呜万维网维稳万维网维稳','normal','2015-12-21 09:59:41','2015-12-24 20:11:59',NULL,4,1,NULL,'free',1),(5,'心慌10天','劳累时出现心慌不适，无其他不适症状','心电图提示早搏','better','2015-12-21 21:19:40','2015-12-21 21:34:19',NULL,5,1,2,'fee',1),(6,'先心病2天','发现先性病2天','ASD','better','2015-12-21 21:27:56','2015-12-21 21:46:48',NULL,5,1,NULL,'free',1),(7,'谭内部测试用例','谭内部测试用例','','better','2015-12-24 14:45:19','2015-12-24 20:11:25',NULL,4,1,2,'plus',1),(8,'谭测试3','谭测试3','轻轻巧巧请求权 ','normal','2015-12-24 15:00:15','2015-12-24 20:10:40',NULL,4,1,2,'love',1),(9,NULL,NULL,NULL,NULL,'2015-12-24 15:02:42','2015-12-24 15:02:42',NULL,4,1,NULL,NULL,0),(10,NULL,NULL,NULL,NULL,'2015-12-25 22:05:47','2015-12-25 22:05:47',NULL,6,1,NULL,NULL,0),(11,NULL,NULL,NULL,NULL,'2015-12-26 15:45:17','2015-12-26 15:45:17',NULL,7,1,NULL,NULL,0),(12,NULL,NULL,NULL,NULL,'2015-12-26 17:24:28','2015-12-26 17:24:28',NULL,8,1,NULL,NULL,0),(13,NULL,NULL,NULL,NULL,'2015-12-26 17:26:34','2015-12-26 17:26:34',NULL,9,1,NULL,NULL,0);
/*!40000 ALTER TABLE `basic_cases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_infos`
--

DROP TABLE IF EXISTS `basic_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basic_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `birth` datetime DEFAULT NULL,
  `height` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `edited` tinyint(1) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `smokeinfo` varchar(255) DEFAULT NULL,
  `drink` varchar(255) DEFAULT NULL,
  `smoke_account` int(11) DEFAULT NULL,
  `drink_account` int(11) DEFAULT NULL,
  `have_allergy` tinyint(1) DEFAULT NULL,
  `allergy` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_infos`
--

LOCK TABLES `basic_infos` WRITE;
/*!40000 ALTER TABLE `basic_infos` DISABLE KEYS */;
INSERT INTO `basic_infos` VALUES (1,NULL,NULL,0,0,NULL,0,1,'2015-12-20 12:09:33','2015-12-20 12:09:33',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,NULL,NULL,0,0,NULL,0,2,'2015-12-20 12:11:29','2015-12-20 12:11:29',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3,'赵博',NULL,0,0,'male',1,3,'2015-12-20 13:49:08','2015-12-20 13:49:47',33,'never','never',NULL,NULL,0,''),(4,'西早',NULL,178,85,'male',1,4,'2015-12-21 09:59:41','2015-12-21 11:52:37',45,'never','never',NULL,NULL,1,'花粉过敏'),(5,'徐争鸣',NULL,180,74,'male',1,5,'2015-12-21 21:19:40','2015-12-21 21:21:14',30,'sometimes','sometimes',2,1,1,'雾霾'),(6,'王文伟',NULL,167,82,'male',1,6,'2015-12-25 22:05:47','2015-12-25 22:07:23',43,'sometimes','sometimes',11,2,1,'啊啊啊'),(7,NULL,NULL,0,0,NULL,0,7,'2015-12-26 15:45:17','2015-12-26 15:45:17',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,NULL,NULL,0,0,NULL,0,8,'2015-12-26 17:24:28','2015-12-26 17:24:28',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,NULL,NULL,0,0,NULL,0,9,'2015-12-26 17:26:34','2015-12-26 17:26:34',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `basic_infos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_images`
--

DROP TABLE IF EXISTS `blog_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_images`
--

LOCK TABLES `blog_images` WRITE;
/*!40000 ALTER TABLE `blog_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `blog_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `body_signs`
--

DROP TABLE IF EXISTS `body_signs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `body_signs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temperature` int(11) DEFAULT NULL,
  `pulse` int(11) DEFAULT NULL,
  `high_pressure` int(11) DEFAULT NULL,
  `low_pressure` int(11) DEFAULT NULL,
  `swelling` varchar(255) DEFAULT NULL,
  `basic_case_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status_name` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `body_signs`
--

LOCK TABLES `body_signs` WRITE;
/*!40000 ALTER TABLE `body_signs` DISABLE KEYS */;
INSERT INTO `body_signs` VALUES (1,NULL,NULL,NULL,NULL,'',1,'2015-12-20 12:09:33','2015-12-20 12:09:33',''),(2,NULL,NULL,NULL,NULL,'',2,'2015-12-20 12:11:29','2015-12-20 12:11:29',''),(3,NULL,NULL,NULL,NULL,'noswelling',3,'2015-12-20 13:49:08','2015-12-21 21:53:56',''),(4,45,77,88,66,'littleswe',4,'2015-12-21 09:59:41','2015-12-24 14:59:24',''),(5,36,80,130,80,'noswelling',5,'2015-12-21 21:19:40','2015-12-21 21:26:18',''),(6,NULL,NULL,NULL,NULL,'noswelling',6,'2015-12-21 21:27:56','2015-12-21 21:29:04',''),(7,37,88,99,77,'littleswe',7,'2015-12-24 14:45:19','2015-12-24 14:46:22',''),(8,45,99,88,66,'noswelling',8,'2015-12-24 15:00:15','2015-12-24 15:00:53',''),(9,NULL,NULL,NULL,NULL,'',9,'2015-12-24 15:02:42','2015-12-24 15:02:42',''),(10,NULL,NULL,NULL,NULL,'',10,'2015-12-25 22:05:47','2015-12-25 22:05:47',''),(11,NULL,NULL,NULL,NULL,'',11,'2015-12-26 15:45:17','2015-12-26 15:45:17',''),(12,NULL,NULL,NULL,NULL,'',12,'2015-12-26 17:24:28','2015-12-26 17:24:28',''),(13,NULL,NULL,NULL,NULL,'',13,'2015-12-26 17:26:34','2015-12-26 17:26:34','');
/*!40000 ALTER TABLE `body_signs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collaboratings`
--

DROP TABLE IF EXISTS `collaboratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collaboratings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_collaboratings_on_course_id` (`course_id`),
  KEY `index_collaboratings_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaboratings`
--

LOCK TABLES `collaboratings` WRITE;
/*!40000 ALTER TABLE `collaboratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `collaboratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `commentable_id` int(11) DEFAULT NULL,
  `commentable_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_comments_on_commentable_id_and_commentable_type` (`commentable_id`,`commentable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diabetes`
--

DROP TABLE IF EXISTS `diabetes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diabetes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ishave` tinyint(1) DEFAULT NULL,
  `limosis` int(11) DEFAULT NULL,
  `after_meal` int(11) DEFAULT NULL,
  `diagnosis_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diabetes`
--

LOCK TABLES `diabetes` WRITE;
/*!40000 ALTER TABLE `diabetes` DISABLE KEYS */;
INSERT INTO `diabetes` VALUES (1,0,60,120,'2001-02-03 08:00:00',1,'2015-12-20 12:09:33','2015-12-20 12:09:33'),(2,0,60,120,'2001-02-03 08:00:00',2,'2015-12-20 12:11:29','2015-12-20 12:11:29'),(3,0,60,120,'2001-02-03 08:00:00',3,'2015-12-20 13:49:08','2015-12-20 13:49:08'),(4,0,60,120,'2001-02-03 08:00:00',4,'2015-12-21 09:59:41','2015-12-21 09:59:41'),(5,1,8,10,'2001-02-01 00:00:00',5,'2015-12-21 21:19:40','2015-12-21 21:23:04'),(6,0,60,120,'2001-02-03 08:00:00',6,'2015-12-25 22:05:47','2015-12-25 22:05:47'),(7,0,60,120,'2001-02-03 08:00:00',7,'2015-12-26 15:45:17','2015-12-26 15:45:17'),(8,0,60,120,'2001-02-03 08:00:00',8,'2015-12-26 17:24:28','2015-12-26 17:24:28'),(9,0,60,120,'2001-02-03 08:00:00',9,'2015-12-26 17:26:34','2015-12-26 17:26:34');
/*!40000 ALTER TABLE `diabetes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT '',
  `main_desc` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `use_gravatar` tinyint(1) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT '-1',
  `hospital` varchar(255) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `rank` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `speciality` text,
  `recommended` tinyint(3) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (2,'徐争鸣','http://www.hryisheng.com:8080/hryisheng/picture/1450601852414.jpg','海军总医院心脏中心心内科医生','2015-12-20 16:58:46','2015-12-20 16:58:46',NULL,'http://www.hryisheng.com:8080/hryisheng/doctor.action?id=9',9,'海军总医院',NULL,'心内科','医师',0,'male','冠心病, 高血压, 先天性心脏病, 其他疾病',0),(3,'郑宏','http://www.hryisheng.com:8080/hryisheng/picture/1450602446948.png','郑宏，男，1962年出生于江西高安。1985年毕业于江西医学院医疗系，同年留校一附院工作。88年考入中国医学科学院协和医科大学研究生院。91年获硕士学位并留北京阜外医院放射科工作至今。92年到医科院肿瘤医院进修MRI半年，1996年至98年赴法国ParlyII心血管病医院介入中心作访问学者与客座教授。1996年及2000年分别两次破格晋升为副主任医师及主任医师。99年被评选为硕士研究生导师。2000年帮助筹建武汉亚洲心脏病医院介入中心。目前主要从事心血管病影像诊断及介入治疗工作，在心血管病尤其是在先心病、冠心病、瓣膜病及外周血管疾病的影像诊断及介入治疗方面有较深造诣。现兼任中国科协司法鉴定中心临床鉴定专家，欧美同学会理事、中华中医药学会介入心脏病学专家委员会常委，北京亚健康协会常务理事，中华现代外科学杂志等数家国家级及省级杂志的编委和常务编委，以及先后兼任十余家国内外医院的顾问与客座教授。自2009年起被聘任为卫生部心血管病介入诊疗培训基地导师。\r\n　　至今已完成近万例各种心血管病造影及介入治疗手术，包括各种先心病及疑难复杂先心病的介入治疗，冠心病、瓣膜病、大血管、外周血管、肾动脉及颈动脉病变的诊断及介入治疗。其中有５篇介入论文在国际上为该领域中首篇报道或最大组报道，其中3项介入手术为国际首例。 \r\n　　共发表论文50余篇（国际级8篇，国家级33篇，省市级10余篇），参加各种国际学术会议发表演讲及学术交流、论文摘要20余次/篇。参与学术著作编写7部。到全国各地以及印度、越南等国家进行学术讲座及手术演示，帮助其开展心脏病介入治疗与诊断新项目百余次。\r\n　　91年获中国循环杂志论文有奖征文三等奖，92年获全国心胸影像学术会议论文比赛二等奖。94年至2010年申报国家发明与实用新型专利6项并被载入《国家级科技成果研制功臣名录》及《中华优秀专利精选》；94年“PDA介入治疗的临床应用与推广”获院成就二等奖；96年在法国研修期间，因突出表现受到“凡尔赛新闻周报”记者专访及报道。2000年1月20日成功实施了国际上首例“双球囊法主动脉瓣瓣上狭窄”（多家报纸及电视台作了报道）并作为特邀嘉宾出席并在巴黎召开的“第二届介入性心脏病法语区国际学术会议”上进行交流。1995、1998、2003及2009年先后四次承担卫生部及国家自然科学基金课题的课题负责人。先心病封堵器等多项专利产品的自主研发取得成功，并在进行临床试验及全国普及推广，2007年为中华红十字会爱心工程即胡大一爱心工程捐献先心病封堵器治疗器械。','2015-12-20 17:09:34','2015-12-20 17:09:34',NULL,'http://www.hryisheng.com:8080/hryisheng/doctor.action?id=10',10,'阜外医院',NULL,'放射科','主任医师',0,'male','冠心病, 先天性心脏病, 心脏瓣膜病, 大动脉疾病',0),(4,'李君','http://www.hryisheng.com:8080/hryisheng/picture/1450608442129.jpg','心内科知名教授','2015-12-20 18:49:11','2015-12-20 18:49:11',NULL,'http://www.hryisheng.com:8080/hryisheng/doctor.action?id=12',12,'东明县第一人民医院',NULL,'心内科','主任医师',0,'female','冠心病, 高血压, 心律失常, 心肌病, 先天性心脏病, 心脏瓣膜病, 肺动脉高压, 大动脉疾病, 其他疾病',0),(5,'杨延坤','http://www.hryisheng.com:8080/hryisheng/picture/1450609138308.jpg','北京协和医学院 阜外医院心内科博士生','2015-12-20 18:55:24','2015-12-20 18:59:01',NULL,'http://www.hryisheng.com:8080/hryishengdoctor.action?id=13',13,'阜外医院',NULL,'心内科','医师',0,'male','冠心病, 高血压, 心律失常, 心肌病, 先天性心脏病, 心脏瓣膜病, 肺动脉高压, 大动脉疾病, 其他疾病',0),(6,'杨帆','http://www.hryisheng.com:8080/hryisheng/picture/1450609962104.jpg','北京协和医学院、阜外医院 硕士研究生','2015-12-20 19:13:45','2015-12-20 19:13:45',NULL,'http://www.hryisheng.com:8080/hryisheng/doctor.action?id=14',14,'阜外医院',NULL,'放射科','医师',0,'male','冠心病, 先天性心脏病, 心脏瓣膜病, 大动脉疾病, 其他疾病',0),(7,'孙鑫','http://www.hryisheng.com:8080/hryisheng/picture/1450610409232.jpg','著名心脏外科医生','2015-12-20 19:20:57','2015-12-20 19:20:57',NULL,'http://www.hryisheng.com:8080/hryisheng/doctor.action?id=15',15,'阜外医院',NULL,'心外科','主治医师',0,'male','冠心病, 先天性心脏病, 心脏瓣膜病, 肺动脉高压, 其他疾病',0);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hyperlipidemia`
--

DROP TABLE IF EXISTS `hyperlipidemia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hyperlipidemia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ishave` tinyint(1) DEFAULT NULL,
  `diagnosis_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hyperlipidemia`
--

LOCK TABLES `hyperlipidemia` WRITE;
/*!40000 ALTER TABLE `hyperlipidemia` DISABLE KEYS */;
INSERT INTO `hyperlipidemia` VALUES (1,0,'2001-02-03 08:00:00',1,'2015-12-20 12:09:33','2015-12-20 12:09:33'),(2,0,'2001-02-03 08:00:00',2,'2015-12-20 12:11:29','2015-12-20 12:11:29'),(3,0,'2001-02-03 08:00:00',3,'2015-12-20 13:49:08','2015-12-20 13:49:08'),(4,0,'2001-02-03 08:00:00',4,'2015-12-21 09:59:41','2015-12-21 09:59:41'),(5,1,'2001-02-04 00:00:00',5,'2015-12-21 21:19:40','2015-12-21 21:23:39'),(6,0,'2001-02-03 08:00:00',6,'2015-12-25 22:05:47','2015-12-25 22:05:47'),(7,0,'2001-02-03 08:00:00',7,'2015-12-26 15:45:17','2015-12-26 15:45:17'),(8,0,'2001-02-03 08:00:00',8,'2015-12-26 17:24:28','2015-12-26 17:24:28'),(9,0,'2001-02-03 08:00:00',9,'2015-12-26 17:26:34','2015-12-26 17:26:34');
/*!40000 ALTER TABLE `hyperlipidemia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hypertensions`
--

DROP TABLE IF EXISTS `hypertensions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hypertensions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ishave` tinyint(1) DEFAULT NULL,
  `before_high` int(11) DEFAULT NULL,
  `before_low` int(11) DEFAULT NULL,
  `now_high` int(11) DEFAULT NULL,
  `now_low` int(11) DEFAULT NULL,
  `diagnosis_date` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hypertensions`
--

LOCK TABLES `hypertensions` WRITE;
/*!40000 ALTER TABLE `hypertensions` DISABLE KEYS */;
INSERT INTO `hypertensions` VALUES (1,0,120,60,120,60,'2001-02-03 08:00:00',1,'2015-12-20 12:09:33','2015-12-20 12:09:33'),(2,0,120,60,120,60,'2001-02-03 08:00:00',2,'2015-12-20 12:11:29','2015-12-20 12:11:29'),(3,0,120,60,120,60,'2001-02-03 08:00:00',3,'2015-12-20 13:49:08','2015-12-20 13:49:08'),(4,0,120,60,120,60,'2001-02-03 08:00:00',4,'2015-12-21 09:59:41','2015-12-21 09:59:41'),(5,1,140,90,130,80,'2012-08-01 00:00:00',5,'2015-12-21 21:19:40','2015-12-21 21:22:20'),(6,1,120,60,120,60,'2001-02-03 00:00:00',6,'2015-12-25 22:05:47','2015-12-25 22:10:01'),(7,0,120,60,120,60,'2001-02-03 08:00:00',7,'2015-12-26 15:45:17','2015-12-26 15:45:17'),(8,0,120,60,120,60,'2001-02-03 08:00:00',8,'2015-12-26 17:24:28','2015-12-26 17:24:28'),(9,0,120,60,120,60,'2001-02-03 08:00:00',9,'2015-12-26 17:26:34','2015-12-26 17:26:34');
/*!40000 ALTER TABLE `hypertensions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `unread` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `notifiable_id` int(11) DEFAULT NULL,
  `notifiable_type` varchar(255) DEFAULT NULL,
  `executor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_notifications_on_unread` (`unread`),
  KEY `index_notifications_on_user_id` (`user_id`),
  KEY `index_notifications_on_notifiable_id_and_notifiable_type` (`notifiable_id`,`notifiable_type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,5,0,'2015-12-21 21:34:19','2015-12-21 21:34:19','reply',1,'Reply',2),(2,5,0,'2015-12-21 21:46:48','2015-12-21 21:46:48','reply',2,'Reply',2),(3,3,1,'2015-12-21 21:55:05','2015-12-21 21:55:05','reply',3,'Reply',2),(4,4,1,'2015-12-24 20:10:40','2015-12-24 20:10:40','reply',4,'Reply',2),(5,4,1,'2015-12-24 20:11:25','2015-12-24 20:11:25','reply',5,'Reply',2),(6,4,1,'2015-12-24 20:11:59','2015-12-24 20:11:59','reply',6,'Reply',2);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operations`
--

DROP TABLE IF EXISTS `operations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `desc` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `sick_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operations`
--

LOCK TABLES `operations` WRITE;
/*!40000 ALTER TABLE `operations` DISABLE KEYS */;
INSERT INTO `operations` VALUES (1,'阑尾炎手术','右下腹疼痛','2015-12-21 21:24:39','2015-12-21 21:24:39',NULL,NULL,NULL,NULL,5,NULL,NULL,NULL,1,'2015-08-04 00:00:00'),(2,'测试1','生生世世是','2015-12-24 14:58:01','2015-12-24 14:58:01',NULL,NULL,NULL,NULL,4,NULL,NULL,NULL,1,'2015-12-14 00:00:00');
/*!40000 ALTER TABLE `operations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `notify_id` varchar(255) DEFAULT NULL,
  `total_fee` float DEFAULT NULL,
  `trade_status` varchar(255) DEFAULT NULL,
  `out_trade_no` varchar(255) DEFAULT NULL,
  `notify_time` datetime DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relationships`
--

DROP TABLE IF EXISTS `relationships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relationships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) DEFAULT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_relationships_on_follower_id_and_followed_user_id` (`follower_id`,`followed_user_id`),
  KEY `index_relationships_on_follower_id` (`follower_id`),
  KEY `index_relationships_on_followed_user_id` (`followed_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationships`
--

LOCK TABLES `relationships` WRITE;
/*!40000 ALTER TABLE `relationships` DISABLE KEYS */;
/*!40000 ALTER TABLE `relationships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `replies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sick_name` varchar(255) DEFAULT NULL,
  `basic_case_id` int(11) DEFAULT NULL,
  `main_desc` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `sick_sub_name` varchar(255) DEFAULT NULL,
  `allow_plus` tinyint(1) DEFAULT '0',
  `plus_date` datetime DEFAULT NULL,
  `plus_department` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
INSERT INTO `replies` VALUES (1,'HR_ICD_01005',5,'进一步检查','2015-12-21 21:34:19','2015-12-21 21:34:19',2,'HR_ICD_01005001',0,NULL,NULL),(2,'HR_ICD_01005',6,'需要进一步检查明确缺损边远情况，必要时进一步封堵治疗','2015-12-21 21:46:48','2015-12-21 21:46:48',2,'HR_ICD_01005001',0,NULL,NULL),(3,'HR_ICD_01002',3,'需要进行介入治疗','2015-12-21 21:55:05','2015-12-21 21:55:05',2,'HR_ICD_01002004',0,NULL,NULL),(4,'需进一步明确确诊',8,'需要进一步检查明确诊断','2015-12-24 20:10:40','2015-12-24 20:10:40',2,'需进一步明确确诊',0,NULL,NULL),(5,'HR_ICD_01003',7,'心电图检查','2015-12-24 20:11:25','2015-12-24 20:11:25',2,'HR_ICD_01003003',0,NULL,NULL),(6,'需进一步明确确诊',4,'上传心电图检查','2015-12-24 20:11:59','2015-12-24 20:11:59',2,'需进一步明确确诊',0,NULL,NULL);
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `support_number` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `price_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (1,6,NULL,NULL,'2015-12-21 19:58:32','2015-12-21 19:58:32',2,'love'),(2,5,10,NULL,'2015-12-21 19:58:32','2015-12-21 19:58:32',2,'fee'),(3,3,20,NULL,'2015-12-21 19:58:32','2015-12-21 19:58:32',2,'plus'),(4,10,NULL,NULL,'2015-12-21 20:26:13','2015-12-21 20:26:13',4,'love'),(5,5,50,NULL,'2015-12-21 20:26:13','2015-12-21 20:26:13',4,'fee'),(6,2,50,NULL,'2015-12-21 20:26:13','2015-12-21 20:26:13',4,'plus');
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sick_assets`
--

DROP TABLE IF EXISTS `sick_assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sick_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `desc` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `basic_case_id` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `asset_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sick_assets`
--

LOCK TABLES `sick_assets` WRITE;
/*!40000 ALTER TABLE `sick_assets` DISABLE KEYS */;
INSERT INTO `sick_assets` VALUES (1,'心电图',NULL,'2015-12-21 21:27:27','2015-12-21 21:27:27',NULL,'FpfYGZTbw_RC7yFbAxRMnJKWXf-p',5,3387027,'IMG_20151211_164733.jpg','image/jpeg',1,'heart'),(2,'超声',NULL,'2015-12-21 21:29:28','2015-12-21 21:29:29',NULL,'FvD0MQwlJuibrqYX2hXQTU3gTJcD',6,3134264,'IMG_20151211_164700.jpg','image/jpeg',1,'CT'),(3,'一次测试检查',NULL,'2015-12-24 14:49:55','2015-12-24 14:49:55',NULL,'FtmX4cN-3AWth9A2A-Mq1JXuLPzh',7,595284,'Hydrangeas.jpg','image/jpeg',1,'exper'),(4,'测试检查',NULL,'2015-12-24 14:59:41','2015-12-24 14:59:41',NULL,'FjsVvoSv8gsyKpPAuaqmLiWtM7S0',4,775702,'Jellyfish.jpg','image/jpeg',1,'heart'),(5,'测试3',NULL,'2015-12-24 15:01:14','2015-12-24 15:01:14',NULL,'Fpw9yx-RhaMU6iXVGu07WIGzL0IM',8,780831,'Koala.jpg','image/jpeg',1,'heart');
/*!40000 ALTER TABLE `sick_assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sick_cases`
--

DROP TABLE IF EXISTS `sick_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sick_cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sick_cases`
--

LOCK TABLES `sick_cases` WRITE;
/*!40000 ALTER TABLE `sick_cases` DISABLE KEYS */;
/*!40000 ALTER TABLE `sick_cases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sick_hists`
--

DROP TABLE IF EXISTS `sick_hists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sick_hists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `sub_title` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `sick_date` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sick_hists`
--

LOCK TABLES `sick_hists` WRITE;
/*!40000 ALTER TABLE `sick_hists` DISABLE KEYS */;
INSERT INTO `sick_hists` VALUES (1,'xinlvshichang','xinlvshichang1','偶尔病情','FtmX4cN-3AWth9A2A-Mq1JXuLPzh',4,595284,'Hydrangeas.jpg','image/jpeg',1,'2013-10-02 00:00:00','2015-12-21 11:54:09','2015-12-21 11:55:39'),(2,'gaoxueya','gaoxueya1','三年',NULL,4,NULL,NULL,NULL,2,'1999-12-08 00:00:00','2015-12-21 11:56:19','2015-12-21 11:56:19'),(3,'xinlvshichang','xinlvshichang10','心悸不适',NULL,5,NULL,NULL,NULL,1,'2015-12-01 00:00:00','2015-12-21 21:24:16','2015-12-21 21:24:16');
/*!40000 ALTER TABLE `sick_hists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sicknesses`
--

DROP TABLE IF EXISTS `sicknesses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sicknesses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `desc` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `public` tinyint(1) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `sick_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sicknesses`
--

LOCK TABLES `sicknesses` WRITE;
/*!40000 ALTER TABLE `sicknesses` DISABLE KEYS */;
INSERT INTO `sicknesses` VALUES (1,'test','','2015-12-20 12:12:36','2015-12-20 12:12:36',NULL,NULL,NULL,'FjBCDRqa-yvLYDNYElaa9ENaWc4X',2,845941,'Desert.jpg','image/jpeg',1,'2015-12-09 00:00:00'),(2,'阑尾炎手术','腹痛','2015-12-21 21:25:18','2015-12-21 21:25:18',NULL,NULL,NULL,'FhtGBbDiDOzPkaonjRDoH61k4k4n',5,561276,'Lighthouse.jpg','image/jpeg',1,'2015-07-06 00:00:00'),(3,'谭测试病历1','测试病历描述','2015-12-24 14:57:14','2015-12-24 14:57:14',NULL,NULL,NULL,'FvX4rSaBmkcTGNJGMfpQVQNnEqh-',4,879394,'Chrysanthemum.jpg','image/jpeg',1,'2015-12-08 00:00:00'),(4,'测试病历2','测试测试城市','2015-12-24 14:57:38','2015-12-24 14:57:38',NULL,NULL,NULL,'FlTC8aHrbxLWgaXHB4QhpVAM7gKt',4,620888,'Tulips.jpg','image/jpeg',2,'2015-12-23 00:00:00'),(5,'哎哎哎','是是是','2015-12-25 22:11:09','2015-12-25 22:11:09',NULL,NULL,NULL,'FrbC0L2kv-DNMgXv61RjNnMWhsqU',6,124671,'zh\'\'.jpg','image/jpeg',1,'2015-12-17 00:00:00');
/*!40000 ALTER TABLE `sicknesses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_signs`
--

DROP TABLE IF EXISTS `status_signs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status_signs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_signs`
--

LOCK TABLES `status_signs` WRITE;
/*!40000 ALTER TABLE `status_signs` DISABLE KEYS */;
INSERT INTO `status_signs` VALUES (1,'xiongmen','2015-12-26 17:45:46','2015-12-26 17:45:46'),(2,'huxikunnan','2015-12-26 17:45:58','2015-12-26 17:45:58'),(3,'xinji','2015-12-26 17:46:13','2015-12-26 17:46:13'),(4,'xiongtong','2015-12-26 17:46:25','2015-12-26 17:46:25'),(5,'fare','2015-12-26 17:46:40','2015-12-26 17:46:40'),(6,'yanqianfahei','2015-12-26 17:46:50','2015-12-26 17:46:50'),(7,'yundao','2015-12-26 17:47:03','2015-12-26 17:47:03'),(8,'yisixingyishisangshi','2015-12-26 17:47:39','2015-12-26 17:47:39');
/*!40000 ALTER TABLE `status_signs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `password_reset_sent_at` datetime DEFAULT NULL,
  `use_gravatar` tinyint(1) DEFAULT NULL,
  `phonenum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'','$2a$10$ZdORRHXsrI7FM0HctfMHrOi0Q7BiRO7I9nmIWXl2RkNkrrT2ySkZm','2015-12-20 12:09:33','2015-12-20 12:09:33','fs6wvF7iPgiqizFCd-Gmmg',NULL,'chfw',NULL,NULL,NULL,NULL,'13810139056'),(2,'','$2a$10$7mjb95y9os/.PBxr3kVo7.kJlx1NV6PEG8S3vjXROKmlzq//m6aku','2015-12-20 12:11:29','2015-12-20 12:12:39','UaZLmriAMvJfmPcG_brFkw',NULL,'chenfw',NULL,NULL,NULL,NULL,'13801139093'),(3,'','$2a$10$IxD3IyrW3XrkSQLHbAfAH.0FWOigWo/GIg0u/r.eiyUJbN8pN/qMq','2015-12-20 13:49:08','2015-12-20 13:49:08','4VBNHDw_esmWNaqERMgq0A',NULL,'zhaobo',NULL,NULL,NULL,NULL,'13810841734'),(4,'','$2a$10$fZwbVTriWV5iSoxfwQKNW.XEFq8caVrArzgG/D.gpXBCAdP.48kyy','2015-12-21 09:59:40','2015-12-24 14:58:01','jI4Cs4tX5vK5afy5cOlX8g',NULL,'wumai123',NULL,NULL,NULL,NULL,'13301168776'),(5,'','$2a$10$M/n6DdWrh7xYVTBx/cASMOuyBmGxLQE1Z9VM2dGAoTrJ2DScUXSje','2015-12-21 21:19:40','2015-12-21 21:25:20','AL0HlwYhdbFhYIUfiPUnDg',NULL,'yonggan',NULL,NULL,NULL,NULL,'13466401064'),(6,'','$2a$10$cl4KblEj4SYkskjyNiMXlerLRergUvndzfvA2vFvOa5DJrsMrc7pq','2015-12-25 22:05:47','2015-12-25 22:11:09','EFFKBBLgLPccaBc_PaLJkg',NULL,'www',NULL,NULL,NULL,NULL,'18611720130'),(7,'','$2a$10$gElCc9PiDkkZSbgVrShwIucId6Q1JAOshduK/NYowiVLvBqpkj3/W','2015-12-26 15:45:17','2015-12-26 15:45:17','y5qZnugs2F9jY0uYrQtIfA',NULL,'yonggandexin1',NULL,NULL,NULL,NULL,'18600317712'),(8,'','$2a$10$jdfBuLoUsx51/aMIToaFuuYFMRDGmzzqHPT21gTHvJ6OA0NjvhZCa','2015-12-26 17:24:28','2015-12-26 17:24:28','dDJGAnbrg5ukQG4RTaRwsA',NULL,'huangzhe1218',NULL,NULL,NULL,NULL,'13811912092'),(9,'','$2a$10$kSgmI/PLV/t0kcF/7E8On.brcqotS4hx8RNNKi5JD43xg7/eu0WRe','2015-12-26 17:26:34','2015-12-26 17:26:34','8X_KPhWtaUvNfILRGbQd0w',NULL,'huangzhe1513',NULL,NULL,NULL,NULL,'13811912091');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `desc` text,
  `user_id` int(11) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `content_type` varchar(255) DEFAULT NULL,
  `asset` varchar(255) DEFAULT NULL,
  `free` tinyint(1) DEFAULT NULL,
  `ratio` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchings`
--

DROP TABLE IF EXISTS `watchings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watchings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_watchings_on_course_id` (`course_id`),
  KEY `index_watchings_on_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchings`
--

LOCK TABLES `watchings` WRITE;
/*!40000 ALTER TABLE `watchings` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-26 17:51:49
