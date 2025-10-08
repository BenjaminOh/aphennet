-- MariaDB 초기화 스크립트
-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS aphennet_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 사용자 생성 및 권한 부여
CREATE USER IF NOT EXISTS 'aphennet'@'%' IDENTIFIED BY 'aphennet!@34';
GRANT ALL PRIVILEGES ON aphennet_db.* TO 'aphennet'@'%';

-- 권한 새로고침
FLUSH PRIVILEGES;

-- 데이터베이스 선택
USE aphennet_db;

-- ===========================================
-- 실제 프로젝트 스키마 (schema_only.sql 기반)
-- ===========================================

-- MariaDB dump 10.19-11.0.2-MariaDB, for linux-systemd (x86_64)
-- Host: 112.175.29.146    Database: likeweb_basic_solution
-- Server version	11.0.2-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dd`
--

--
-- Table structure for table `i_banner`
--

DROP TABLE IF EXISTS `i_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_banner` (
  `idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '키',
  `b_type` enum('P','M') DEFAULT NULL COMMENT 'pc, mobile 구분(PC:P, MOBILE:M)',
  `b_open` enum('Y','N') DEFAULT 'N' COMMENT '노출여부 (노출:Y, 비노출:N)',
  `b_title` varchar(50) DEFAULT NULL COMMENT '배너명',
  `b_s_date` varchar(50) DEFAULT NULL COMMENT '노출시작일',
  `b_e_date` varchar(50) DEFAULT NULL COMMENT '노출종료일',
  `b_size` enum('1','2') DEFAULT NULL COMMENT '배너노출종류(1: 커버, 2:원본사이즈)',
  `b_width_size` int(11) DEFAULT NULL COMMENT '배너가로사이즈',
  `b_height_size` int(11) DEFAULT NULL COMMENT '배너세올사이즈',
  `b_c_type` enum('1','2','3') DEFAULT NULL COMMENT '카테고리종류(1:이미지, 2:동영상, 3:HTML)',
  `b_file` varchar(500) DEFAULT NULL COMMENT '배너파일명',
  `b_mov_url` varchar(500) DEFAULT NULL COMMENT '동영상URL',
  `b_url` varchar(50) DEFAULT NULL COMMENT '배너링크',
  `b_url_target` enum('1','2') DEFAULT NULL COMMENT '배너링크타겟(1:부모창, 2:새창)',
  `b_mov_type` enum('1','2','') DEFAULT NULL COMMENT '동영상업로드(1:직접, 2:URL)',
  `b_mov_play` enum('Y','') DEFAULT 'Y' COMMENT '동영상자동재생',
  `b_mov_sound` enum('Y','') DEFAULT 'Y' COMMENT '동영상소리재생',
  `b_content` text DEFAULT NULL COMMENT 'HTML 내용',
  `b_movenum` int(11) DEFAULT NULL COMMENT '배너순서',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_board`
--

DROP TABLE IF EXISTS `i_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_board` (
  `idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '키',
  `category` int(11) DEFAULT NULL COMMENT '카테고리',
  `m_email` varchar(50) DEFAULT NULL COMMENT '메일주소',
  `m_name` varchar(50) DEFAULT NULL COMMENT '이름',
  `m_pwd` varchar(100) DEFAULT NULL COMMENT '비밀번호',
  `b_title` varchar(100) DEFAULT NULL COMMENT '제목',
  `b_contents` text DEFAULT NULL COMMENT '내용',
  `b_reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `parent_id` int(11) DEFAULT NULL COMMENT '부모게시글idx',
  `b_depth` int(11) DEFAULT NULL COMMENT '부모글,덧글(부모글 : 0, 덧글: 1)',
  `b_notice` enum('0','1') DEFAULT '0' COMMENT '공지 (일반: 0, 공지:1)',
  `b_view` int(11) DEFAULT 0 COMMENT '조회수',
  `b_img` varchar(500) DEFAULT NULL COMMENT '썸네일이미지',
  `b_file` varchar(500) DEFAULT NULL COMMENT '첨부파일',
  `b_sms_yn` enum('Y','') DEFAULT NULL COMMENT 'SMS알림여부',
  `b_sms_phone` varchar(13) DEFAULT NULL COMMENT 'SMS알림번호',
  `b_email_yn` enum('Y','') DEFAULT NULL COMMENT 'Email알림여부',
  `b_email` varchar(50) DEFAULT NULL COMMENT '알림email주소',
  `b_recom` int(11) DEFAULT NULL COMMENT '추천',
  `b_secret` varchar(4) DEFAULT NULL COMMENT '비밀글',
  `a_read` enum('Y','') DEFAULT NULL COMMENT '관리자알림읽기',
  `a_delete` enum('Y','') DEFAULT NULL COMMENT '관리자알림삭제',
  `b_reply` text DEFAULT NULL COMMENT '답변',
  `group_id` int(11) DEFAULT NULL COMMENT '분류id',
  `b_num` int(11) DEFAULT NULL COMMENT '순서',
  PRIMARY KEY (`idx`),
  KEY `i_board_category_IDX` (`category`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_board_comment`
--

DROP TABLE IF EXISTS `i_board_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_board_comment` (
  `idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '키',
  `board_idx` int(11) DEFAULT NULL COMMENT '게시글idx',
  `parent_idx` int(11) DEFAULT NULL COMMENT '부모댓글idx',
  `depth` int(11) DEFAULT NULL COMMENT '댓글계층',
  `m_email` varchar(50) DEFAULT NULL COMMENT '메일주소',
  `m_name` varchar(50) DEFAULT NULL COMMENT '이름',
  `m_pwd` varchar(100) DEFAULT NULL COMMENT '비밀번호',
  `c_contents` text DEFAULT NULL COMMENT '내용',
  `c_reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `a_read` enum('Y','') DEFAULT NULL COMMENT '관리자알림읽기',
  `a_delete` enum('Y','') DEFAULT NULL COMMENT '관리자알림삭제',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_board_file`
--

DROP TABLE IF EXISTS `i_board_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_board_file` (
  `idx` float NOT NULL AUTO_INCREMENT COMMENT '키',
  `parent_idx` int(11) DEFAULT NULL COMMENT '게시글idx',
  `file_name` varchar(500) DEFAULT NULL COMMENT '파일명',
  `original_name` varchar(500) DEFAULT NULL COMMENT '원본파일명',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `kind` enum('B','E') DEFAULT NULL COMMENT '게시구분(B:게시글첨부, E:에디터첨부)',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_category`
--

DROP TABLE IF EXISTS `i_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `c_depth` int(11) DEFAULT NULL COMMENT '메뉴계층',
  `c_depth_parent` int(11) DEFAULT NULL COMMENT '부모메뉴',
  `c_num` int(11) DEFAULT NULL COMMENT '순서',
  `c_name` varchar(50) DEFAULT NULL COMMENT '메뉴명',
  `c_main_banner` varchar(50) DEFAULT NULL COMMENT '서브메인배너(커버:1, 원본:2)',
  `c_main_banner_file` varchar(50) DEFAULT NULL COMMENT '제목이미지파일',
  `c_menu_ui` varchar(50) DEFAULT NULL COMMENT '메뉴UI(텍스트:TXT, 이미지:IMG)',
  `c_menu_on_img` varchar(50) DEFAULT NULL COMMENT '메뉴on이미지',
  `c_menu_off_img` varchar(50) DEFAULT NULL COMMENT '메뉴off이미지',
  `c_content_type` int(11) DEFAULT NULL COMMENT '카테고리종류(HTML:1, EMPTY:2, CUSTOM:3, BOARD:4, GALLERY:5, FAQ:6, QNA:7)',
  `c_use_yn` enum('Y','N','D') DEFAULT NULL COMMENT '사용여부(사용:Y, 미사용:N, 삭제:D)',
  `c_reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `c_lang` varchar(50) DEFAULT NULL COMMENT '다국어구분',
  `c_link_target` varchar(1) DEFAULT NULL COMMENT '링크열림창',
  `c_link_url` varchar(200) DEFAULT NULL COMMENT '링크주소',
  `c_kind_use` varchar(1) DEFAULT NULL COMMENT '전체분류사용여부',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_category_board`
--

DROP TABLE IF EXISTS `i_category_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_category_board` (
  `parent_id` int(11) DEFAULT NULL,
  `b_list_cnt` int(11) DEFAULT NULL COMMENT '게시글리스트갯수',
  `b_column_title` varchar(10) DEFAULT NULL COMMENT '제목 노출여부',
  `b_column_date` varchar(10) DEFAULT NULL COMMENT '날짜 노출여부',
  `b_column_view` varchar(10) DEFAULT NULL COMMENT '조회수 노출여부',
  `b_column_recom` varchar(10) DEFAULT NULL COMMENT '추천수 노출여부',
  `b_column_file` varchar(10) DEFAULT NULL COMMENT '첨부파일 노출여부',
  `b_thumbnail_with` int(11) DEFAULT NULL COMMENT '썸네일가로사이즈',
  `b_thumbnail_height` int(11) DEFAULT NULL COMMENT '썸네일세로사이즈',
  `b_thumbnail` varchar(1) DEFAULT NULL COMMENT '썸네일이미지구분',
  `b_read_lv` int(11) DEFAULT NULL COMMENT '읽기권한',
  `b_write_lv` int(11) DEFAULT NULL COMMENT '쓰기권한',
  `b_group` varchar(50) DEFAULT NULL COMMENT '게시판구분',
  `b_secret` varchar(50) DEFAULT NULL COMMENT '비밀글설정여부',
  `b_reply` varchar(50) DEFAULT NULL COMMENT '답변작성여부',
  `b_reply_lv` int(11) DEFAULT NULL COMMENT '답변작성권한',
  `b_comment` varchar(50) DEFAULT NULL COMMENT '댓글쓰기여부',
  `b_comment_lv` int(11) DEFAULT NULL COMMENT '댓글쓰기권한',
  `b_write_alarm` varchar(50) DEFAULT NULL COMMENT '알림수신정보문자',
  `b_write_send` varchar(50) DEFAULT NULL COMMENT '알림수신정보메일',
  `b_write_sms` varchar(50) DEFAULT NULL COMMENT '알림수신정보문자',
  `b_alarm` varchar(50) DEFAULT NULL COMMENT '게시알림사용여부',
  `b_alarm_phone` varchar(50) DEFAULT NULL COMMENT '게시알림전화번호',
  `b_top_html` text DEFAULT NULL COMMENT '상단HTML',
  `b_template` varchar(1) DEFAULT NULL COMMENT '게시글템플릿적용',
  `b_template_text` text DEFAULT NULL COMMENT '템플릿내용',
  `use_yn` varchar(1) DEFAULT NULL COMMENT '카테고리사용여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_category_board_group`
--

DROP TABLE IF EXISTS `i_category_board_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_category_board_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL COMMENT '카테고리부모id',
  `g_num` int(11) DEFAULT NULL COMMENT '순서',
  `g_name` varchar(50) DEFAULT NULL COMMENT '구분명',
  `g_menu_ui` varchar(50) DEFAULT NULL COMMENT '메뉴UI (텍스트:TEXT, 이미지:IMG)',
  `g_img_on` varchar(50) DEFAULT NULL COMMENT 'on이미지',
  `g_img_off` varchar(50) DEFAULT NULL COMMENT 'off이미지',
  `use_yn` enum('Y','N','D') DEFAULT NULL COMMENT '사용여부(사용:Y, 미사용:N, 삭제:D)',
  `all_board` varchar(1) DEFAULT NULL COMMENT '전체사용',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_category_custom`
--

DROP TABLE IF EXISTS `i_category_custom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_category_custom` (
  `parent_id` int(11) DEFAULT NULL,
  `c_type` int(11) DEFAULT NULL COMMENT '카테고리유형',
  `file_path` varchar(100) DEFAULT NULL COMMENT '파일경로',
  `admin_file_path` varchar(100) DEFAULT NULL COMMENT '관리자파일경로',
  `sms` varchar(13) DEFAULT NULL COMMENT '수신문자',
  `email` varchar(100) DEFAULT NULL COMMENT '수신메일',
  `use_yn` enum('Y','N','D') DEFAULT NULL COMMENT '사용여부(사용:Y, 미사용:N)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_category_empty`
--

DROP TABLE IF EXISTS `i_category_empty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_category_empty` (
  `parent_id` int(11) DEFAULT NULL COMMENT '카테고리부모id',
  `use_yn` enum('Y','N','D') DEFAULT NULL COMMENT '사용여부'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_category_html`
--

DROP TABLE IF EXISTS `i_category_html`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_category_html` (
  `parent_id` int(11) DEFAULT NULL COMMENT '카테고리부모id',
  `content` text DEFAULT NULL COMMENT 'HTML내용',
  `use_yn` enum('Y','N','D') DEFAULT NULL COMMENT '사용여부(사용:Y, 미사용:N)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_config`
--

DROP TABLE IF EXISTS `i_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_config` (
  `site_id` varchar(50) DEFAULT NULL,
  `c_site_name` varchar(50) DEFAULT NULL COMMENT '사이트명',
  `c_web_title` varchar(50) DEFAULT NULL COMMENT '웹브라우저타이틀',
  `c_ceo` varchar(50) DEFAULT NULL COMMENT '대표자',
  `c_tel` varchar(50) DEFAULT NULL COMMENT '대표전화',
  `c_num` varchar(50) DEFAULT NULL COMMENT '사업자번호',
  `c_num2` varchar(50) DEFAULT NULL COMMENT '통신판매번호',
  `c_email` varchar(50) DEFAULT NULL COMMENT '이메일',
  `c_address` varchar(50) DEFAULT NULL COMMENT '주소',
  `c_fax` varchar(50) DEFAULT NULL COMMENT '팩스',
  `c_manager` varchar(50) DEFAULT NULL COMMENT '개인정보관리책임자',
  `c_b_title` varchar(50) DEFAULT NULL COMMENT '브라우저타이틀',
  `c_meta` varchar(50) DEFAULT NULL COMMENT '메타설명',
  `c_meta_tag` varchar(50) DEFAULT NULL COMMENT '메타태그',
  `c_meta_type` varchar(50) DEFAULT NULL COMMENT '메카분류',
  `c_lang` varchar(50) DEFAULT NULL COMMENT '다국어구분'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_config_lang`
--

DROP TABLE IF EXISTS `i_config_lang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_config_lang` (
  `site_id` varchar(100) DEFAULT NULL,
  `site_lang_hangul` varchar(100) DEFAULT NULL,
  `site_lang` varchar(100) DEFAULT NULL,
  `use_yn` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_logs`
--

DROP TABLE IF EXISTS `i_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_logs` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user` varchar(50) DEFAULT NULL COMMENT '사용자',
  `clientIp` varchar(16) DEFAULT NULL COMMENT 'ip주소',
  `previousUrl` varchar(500) DEFAULT NULL COMMENT 'URL 주소',
  `userAgent` varchar(500) DEFAULT NULL COMMENT 'agent 정보',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `bodyLog` longtext DEFAULT NULL COMMENT 'body',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=184091 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_mailGun`
--

DROP TABLE IF EXISTS `i_mailGun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_mailGun` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `user_pw` varchar(100) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `user_level` int(11) DEFAULT NULL,
  `reg_date` datetime DEFAULT current_timestamp(),
  UNIQUE KEY `i_mailGun_id_IDX` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_member`
--

DROP TABLE IF EXISTS `i_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_member` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `m_email` varchar(50) DEFAULT NULL COMMENT '이메일',
  `m_password` varchar(100) DEFAULT NULL COMMENT '비밀번호',
  `m_name` varchar(50) DEFAULT NULL COMMENT '이름',
  `m_mobile` varchar(13) DEFAULT NULL COMMENT '전화번호',
  `m_sms_yn` enum('Y','N') DEFAULT NULL COMMENT 'sms (수신:Y, 거부:N)',
  `m_mail_yn` enum('Y','N') DEFAULT NULL COMMENT 'email (수신:Y, 거부:N)',
  `m_memo` text DEFAULT NULL COMMENT '메모',
  `m_level` int(11) DEFAULT NULL COMMENT '등급',
  `m_menu_auth` varchar(50) DEFAULT NULL COMMENT '접근권한',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  PRIMARY KEY (`idx`),
  UNIQUE KEY `m_email` (`m_email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_member_level`
--

DROP TABLE IF EXISTS `i_member_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_member_level` (
  `l_level` int(11) DEFAULT NULL COMMENT '등급',
  `l_name` varchar(50) DEFAULT NULL COMMENT '등급이름',
  `signup_lv` varchar(1) DEFAULT NULL COMMENT '회원가입등급'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_member_login`
--

DROP TABLE IF EXISTS `i_member_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_member_login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_email` varchar(50) DEFAULT NULL COMMENT '이메일',
  `log_date` datetime DEFAULT NULL COMMENT '로그인일자',
  `m_mobile` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '휴대폰 번호',
  `clientIp` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '아이피',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1570 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_member_sec`
--

DROP TABLE IF EXISTS `i_member_sec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_member_sec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_email` varchar(50) DEFAULT NULL COMMENT '이메일',
  `sec_date` datetime DEFAULT current_timestamp() COMMENT '탈퇴일',
  `memo` text DEFAULT NULL COMMENT '메모',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_policy`
--

DROP TABLE IF EXISTS `i_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_policy` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `p_title` varchar(50) DEFAULT NULL COMMENT '운영정책명',
  `p_contents` text DEFAULT NULL COMMENT '운영정책내용',
  `p_reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `p_use_yn` enum('Y','N') DEFAULT NULL COMMENT '사용여부(사용:Y, 미사용:N)',
  `policy_type` char(1) DEFAULT NULL COMMENT '운영정책유형',
  `constraint_type` char(1) DEFAULT 'Y' COMMENT '필수선택여부',
  `p_lang` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_popup`
--

DROP TABLE IF EXISTS `i_popup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_popup` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `p_type` varchar(1) DEFAULT NULL COMMENT 'pc, mobile 선택',
  `p_open` enum('Y','N') DEFAULT NULL COMMENT '노출여부 (사용:Y, 사용안함:N)',
  `p_title` varchar(50) DEFAULT NULL COMMENT '팝업제목',
  `p_s_date` varchar(10) DEFAULT NULL COMMENT '시작일',
  `p_e_date` varchar(10) DEFAULT NULL COMMENT '종료일',
  `p_one_day` enum('Y','N') DEFAULT NULL COMMENT '팝업창1일유효여부 (사용:Y, 사용안함:N)',
  `p_layer_pop` enum('1','2') DEFAULT NULL COMMENT '레이어,팝업선택 (레이어:1, 팝업:2)',
  `p_width_size` int(11) DEFAULT NULL COMMENT '가로사이즈',
  `p_height_size` int(11) DEFAULT NULL COMMENT '세로사이즈',
  `p_left_point` int(11) DEFAULT NULL COMMENT '팝업창left 위치',
  `p_top_point` int(11) DEFAULT NULL COMMENT '팝업창top 위치',
  `p_scroll` enum('Y','N') DEFAULT NULL COMMENT '스크롤사용여부(사용:Y, 사용안함:N)',
  `p_link_target` enum('1','2') DEFAULT NULL COMMENT '링크열림창 (1:부모창, 2:새창)',
  `p_link_url` varchar(500) DEFAULT NULL COMMENT '링크URL',
  `p_content` text DEFAULT NULL COMMENT '내용',
  `p_reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  `p_lang` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_pw_token`
--

DROP TABLE IF EXISTS `i_pw_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_pw_token` (
  `pw_token_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT '토큰 키',
  `member_idx` int(11) DEFAULT NULL COMMENT '회원 index',
  `token` varchar(200) DEFAULT NULL COMMENT '접속 토큰',
  `reg_date` datetime DEFAULT current_timestamp() COMMENT '등록일',
  PRIMARY KEY (`pw_token_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='비밀번호 찾기 토큰';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `i_sms_txt`
--

DROP TABLE IF EXISTS `i_sms_txt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `i_sms_txt` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `send_txt` text DEFAULT NULL COMMENT 'SMS 템플릿 내용',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- 설정 복원
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;