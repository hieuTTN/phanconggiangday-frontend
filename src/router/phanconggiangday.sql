-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3307
-- Thời gian đã tạo: Th10 22, 2024 lúc 03:58 PM
-- Phiên bản máy phục vụ: 8.0.30
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `phanconggiangday`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `authority`
--

CREATE TABLE `authority` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `authority`
--

INSERT INTO `authority` (`name`, `description`) VALUES
('ROLE_ADMIN', 'Ban chủ nhiệm khoa'),
('ROLE_ASSISTANT', 'Trợ lý đào tạo'),
('ROLE_HEAD_DEPARTMENT', 'Trưởng bộ môn'),
('ROLE_SPECIALIST', 'Chuyên viên khoa'),
('ROLE_TEACHER', 'Giảng viên');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bai_viet`
--

CREATE TABLE `bai_viet` (
  `id` bigint NOT NULL,
  `mo_ta` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ngay_tao` datetime DEFAULT NULL,
  `noi_dung` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `tieu_de` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `anh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `bai_viet`
--

INSERT INTO `bai_viet` (`id`, `mo_ta`, `ngay_tao`, `noi_dung`, `tieu_de`, `user_id`, `anh`) VALUES
(3, 'Ngày 19/10/2024, tại Hà Nội và Thành phố Hồ Chí Minh, đã diễn ra Vòng chung khảo cuộc thi “Sinh viên với An toàn thông tin ASEAN 2024', '2024-10-22 22:05:18', '<p><strong>Ng&agrave;y 19/10/2024, tại H&agrave; Nội v&agrave; Th&agrave;nh phố Hồ Ch&iacute; Minh, đ&atilde; diễn ra V&ograve;ng chung khảo cuộc thi &ldquo;Sinh vi&ecirc;n với An to&agrave;n th&ocirc;ng tin ASEAN 2024&rdquo;,&nbsp;</strong><strong>&nbsp;với sự tham gia của 83 đội, trong đ&oacute; c&oacute; 56 đội sinh vi&ecirc;n Việt Nam v&agrave; 27 đội sinh vi&ecirc;n 9 nước ASEAN kh&aacute;c. 4 đội thi của sinh vi&ecirc;n Học viện C&ocirc;ng nghệ Bưu ch&iacute;nh Viễn th&ocirc;ng đ&atilde; gi&agrave;nh 02 giải Ba v&agrave; 02 giải Khuyến kh&iacute;ch.</strong></p>\n<p>Cụ thể, Đội PTIT.Celebi v&agrave; Đội PTIT.MuSt4ngPanDa của Cơ sở Đ&agrave;o tạo H&agrave; Nội đ&atilde; lần lượt gi&agrave;nh 02 Giải Ba tại Bảng A: Tấn c&ocirc;ng &ndash; Ph&ograve;ng thủ v&agrave; Bảng B: Cướp cờ (CTF). Đội PTITHCM_L4st04nce v&agrave;&nbsp;<a href=\"https://ascis.vn/teams/915\">PTITHCM_Invisible</a>&nbsp;của Học viện Cơ sở tại TPHCM đ&atilde; đạt 02 giải khuyến kh&iacute;ch tại bảng A v&agrave; B của cuộc thi.</p>\n<p><img class=\"wp-image-32107 size-full\" src=\"https://ptit.edu.vn/wp-content/uploads/2024/10/4-7.jpg\" sizes=\"(max-width: 1280px) 100vw, 1280px\" srcset=\"https://ptit.edu.vn/wp-content/uploads/2024/10/4-7.jpg 1280w, https://ptit.edu.vn/wp-content/uploads/2024/10/4-7-300x222.jpg 300w, https://ptit.edu.vn/wp-content/uploads/2024/10/4-7-1024x758.jpg 1024w, https://ptit.edu.vn/wp-content/uploads/2024/10/4-7-768x569.jpg 768w\" alt=\"\" width=\"1280\" height=\"948\"></p>\n<div id=\"attachment_32111\" class=\"wp-caption alignnone\"><img class=\"wp-image-32111 size-full\" src=\"https://ptit.edu.vn/wp-content/uploads/2024/10/5-6.jpg\" sizes=\"(max-width: 1252px) 100vw, 1252px\" srcset=\"https://ptit.edu.vn/wp-content/uploads/2024/10/5-6.jpg 1252w, https://ptit.edu.vn/wp-content/uploads/2024/10/5-6-300x193.jpg 300w, https://ptit.edu.vn/wp-content/uploads/2024/10/5-6-1024x659.jpg 1024w, https://ptit.edu.vn/wp-content/uploads/2024/10/5-6-768x494.jpg 768w\" alt=\"\" width=\"1252\" height=\"806\" aria-describedby=\"caption-attachment-32111\">\n<p id=\"caption-attachment-32111\" class=\"wp-caption-text\">Ban Tổ chức trao giải Ba cho c&aacute;c đội thi</p>\n</div>\n<p>&nbsp;</p>\n<p>C&oacute; c&ugrave;ng thời gian thi từ 8h30 đến 16h30 ng&agrave;y 19/10, song 2 bảng c&oacute; nội dung thi kh&aacute;c nhau. Cụ thể. Bảng A, thi theo dạng tấn c&ocirc;ng &ndash; ph&ograve;ng thủ trực tiếp (attack-defense), gồm 20 đội thuộc nh&oacute;m c&aacute;c đội đạt kết quả cao nhất v&ograve;ng Sơ khảo của 20 Trường (mỗi Trường chọn 01 đội điểm cao nhất). C&aacute;c đội thi cố gắng bảo vệ c&aacute;c hệ thống của m&igrave;nh khỏi c&aacute;c cuộc tấn c&ocirc;ng từ c&aacute;c đội kh&aacute;c đồng thời cố gắng tấn c&ocirc;ng v&agrave; kiếm điểm từ c&aacute;c hệ thống của đối thủ. Kết quả, Ban Tổ chức đ&atilde; trao 15 Giải thưởng gồm: 1 giải Nhất, 2 giải Nh&igrave;, 3 giải Ba, 09 giải Khuyến kh&iacute;ch.</p>\n<p>Ở bảng B, thi theo h&igrave;nh thức jeopardy, gồm 63 đội trong nh&oacute;m đạt điểm cao v&ograve;ng Sơ khảo c&ograve;n lại. Mỗi trường tham gia Cuộc thi đều c&oacute; 01 đội tham dự Bảng B v&ograve;ng Chung khảo. C&aacute;c đội phải giải quyết c&aacute;c thử th&aacute;ch về ATTT để t&igrave;m ra c&aacute;c &ldquo;cờ&rdquo; (flags) ẩn trong c&aacute;c m&aacute;y chủ, ứng dụng, hoặc c&aacute;c t&agrave;i nguy&ecirc;n mạng kh&aacute;c. Khi t&igrave;m thấy flag, c&aacute;c đội gửi flag l&ecirc;n hệ thống của BTC để ghi điểm.&nbsp;<em>C</em>&oacute; 5 nh&oacute;m thử th&aacute;ch l&agrave;: Dịch ngược, Khai th&aacute;c lỗ hổng phần mềm, Khai th&aacute;c lỗ hổng ứng dụng web, Mật m&atilde; v&agrave; m&atilde; ho&aacute;, C&aacute;c loại kh&aacute;c (điều tra số, lập tr&igrave;nh, kỹthuật giấu tin&hellip;). Kết quả, Ban Tổ chức đ&atilde; trao 24 Giải thưởng: gồm 1 giải Nhất, 3 giải Nh&igrave;, 5 giải Ba, 15 giải Khuyến kh&iacute;ch.</p>\n<div id=\"attachment_32108\" class=\"wp-caption alignnone\"><img class=\"wp-image-32108 size-full\" src=\"https://ptit.edu.vn/wp-content/uploads/2024/10/2-12.jpg\" sizes=\"(max-width: 2400px) 100vw, 2400px\" srcset=\"https://ptit.edu.vn/wp-content/uploads/2024/10/2-12.jpg 2400w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-12-300x200.jpg 300w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-12-1024x683.jpg 1024w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-12-768x512.jpg 768w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-12-600x400.jpg 600w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-12-1536x1024.jpg 1536w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-12-2048x1365.jpg 2048w\" alt=\"\" width=\"2400\" height=\"1600\" aria-describedby=\"caption-attachment-32108\">\n<p id=\"caption-attachment-32108\" class=\"wp-caption-text\">&Ocirc;ng Nguyễn Th&agrave;nh Hưng, Chủ tịch Hiệphội An to&agrave;n th&ocirc;ng tin Việt Nam, ph&aacute;t biểu tại lễ tổng kết v&agrave; trao giải cuộc thi</p>\n</div>\n<p>Ph&aacute;t biểu tại lễ tổng kết v&agrave; trao giải cho c&aacute;c đội thi tại H&agrave; Nội, nguy&ecirc;n Thứ trưởng Bộ TT&amp;TT Nguyễn Th&agrave;nh Hưng, Chủ tịch VNISA, khẳng định g&oacute;p phần ph&aacute;t triển nguồn nh&acirc;n lực an to&agrave;n th&ocirc;ng tin tại Việt Nam l&agrave; một định hướng quan trọng của Hiệp hội, v&agrave; cuộc thi &lsquo;Sinh vi&ecirc;n với an to&agrave;n th&ocirc;ng tin ASEAN&rsquo; h&agrave;ng năm l&agrave; hoạt động cụ thể h&oacute;a định hướng n&agrave;y. &Ocirc;ng Nguyễn Th&agrave;nh Hưng cũng khẳng định: &ldquo;Cuộc thi ng&agrave;y c&agrave;ng được n&acirc;ng cao về chất lượng, tương đồng về với c&aacute;c cuộc thi về an to&agrave;n th&ocirc;ng tin trong khu vực. C&aacute;c đội đạt giải cao tại cuộc thi của ch&uacute;ng ta đ&atilde; được cử tham gia c&aacute;c cuộc thi An to&agrave;n th&ocirc;ng tin trong khu vực v&agrave; đều đạt giải cao.</p>\n<p>C&oacute; 83 đội tham dự v&ograve;ng chung khảo &lsquo;Sinh vi&ecirc;n với An to&agrave;n th&ocirc;ng tin ASEAN 2024&rsquo;. Đ&acirc;y l&agrave; năm nay thứ 2 cuộc thi c&oacute; sự tham dự của sinh vi&ecirc;n cả 10 nước ASEAN.</p>\n<p>Được biết, Lễ trao Bằng khen của Bộ trưởng Bộ Giáo dục &amp; Đào tạo cho c&aacute;c đội đạt giải cao thuộc Bảng A sẽ được thực hiện trong Chương tr&igrave;nh Hội thảo quốc tế &ldquo;Ng&agrave;y An to&agrave;n th&ocirc;ng tin Việt Nam 2024&rdquo;, dự kiến tổ chức v&agrave;o cuối th&aacute;ng 11/2024.</p>', 'Sinh viên PTIT đạt thành tích cao tại cuộc thi ‘Sinh viên với An toàn thông tin ASEAN 2024’', 1, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1729609406/h56djwmmpitend6nsqf4.jpg'),
(4, 'Ngày 15/10/2024, tại Hà Nội, đoàn công tác của Trung tâm Internet Việt Nam (VNNIC) do ông Lê Ngọc Đức – Chủ tịch Hội đồng quản lý', '2024-10-22 22:16:53', '<p><strong>Ng&agrave;y 15/10/2024, tại H&agrave; Nội, đo&agrave;n c&ocirc;ng t&aacute;c của Trung t&acirc;m Internet Việt Nam (VNNIC) do &ocirc;ng&nbsp;L&ecirc; Ngọc Đức &ndash; Chủ tịch Hội đồng quản l&yacute; v&agrave; &ocirc;ng Nguyễn Hồng Thắng &ndash; Gi&aacute;m đốc dẫn đầu đ&atilde; đến thăm v&agrave; l&agrave;m việc tại Học viện C&ocirc;ng nghệ Bưu ch&iacute;nh Viễn th&ocirc;ng. Tiếp đo&agrave;n về ph&iacute;a PTIT c&oacute; GS.TS Từ Minh Phương, B&iacute; thư Đảng ủy, Chủ tịch Hội đồng Học viện, PGS.TS Đặng Ho&agrave;i Bắc, Gi&aacute;m đốc Học viện; TS. Nguyễn Trung Ki&ecirc;n, Ph&oacute; Gi&aacute;m đốc Học viện v&agrave; đại diện c&aacute;c khoa, ph&ograve;ng, ban chức năng của Học viện.</strong></p>\n<div id=\"attachment_32029\" class=\"wp-caption alignnone\"><img class=\"wp-image-32029 size-full\" src=\"https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-scaled.jpg\" sizes=\"(max-width: 2560px) 100vw, 2560px\" srcset=\"https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-scaled.jpg 2560w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-300x188.jpg 300w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-1024x640.jpg 1024w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-768x480.jpg 768w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-1536x960.jpg 1536w, https://ptit.edu.vn/wp-content/uploads/2024/10/2-8-2048x1280.jpg 2048w\" alt=\"\" width=\"2560\" height=\"1600\" aria-describedby=\"caption-attachment-32029\">\n<p id=\"caption-attachment-32029\" class=\"wp-caption-text\">To&agrave;n cảnh buổi l&agrave;m việc</p>\n</div>\n<p>Tại buổi l&agrave;m việc, đại diện l&atilde;nh đạo hai đơn vị đ&atilde; trao đổi, thảo luận một số nội dung dự kiến sẽ hợp t&aacute;c trong thời gian tới. Theo đ&oacute;, ph&iacute;a VNNIC đề xuất sẽ hợp t&aacute;c triển khai c&aacute;c chương tr&igrave;nh đ&agrave;o tạo ngắn hạn v&agrave; d&agrave;i hạn cho sinh vi&ecirc;n về lĩnh vực Internet. C&aacute;c kh&oacute;a học nhằm cung cấp kỹ năng gi&uacute;p sinh vi&ecirc;n n&acirc;ng cao năng lực số th&ocirc;ng qua ứng dụng t&ecirc;n miền quốc gia &ldquo;.vn&rdquo; v&agrave; c&aacute;c dịch vụ số, dịch vụ Internet, bồi dưỡng kỹ năng quản l&yacute; Internet cho sinh vi&ecirc;n. Hai b&ecirc;n cũng thảo luận về việc cung cấp nguồn nh&acirc;n lực về Internet cho VNNIC.</p>\n<div id=\"attachment_32030\" class=\"wp-caption alignnone\"><img class=\"wp-image-32030 size-full\" src=\"https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2.jpg\" sizes=\"(max-width: 2377px) 100vw, 2377px\" srcset=\"https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2.jpg 2377w, https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2-300x188.jpg 300w, https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2-1024x640.jpg 1024w, https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2-768x480.jpg 768w, https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2-1536x960.jpg 1536w, https://ptit.edu.vn/wp-content/uploads/2024/10/z5933738290136_a03e601b9bf2fbd0005ddd0a206e3be2-2048x1280.jpg 2048w\" alt=\"\" width=\"2377\" height=\"1486\" aria-describedby=\"caption-attachment-32030\">\n<p id=\"caption-attachment-32030\" class=\"wp-caption-text\">&Ocirc;ng Nguyễn Trường Giang, Ph&oacute; Gi&aacute;m đốc VNNIC giới thiệu về VNNIC</p>\n</div>\n<p>Kết th&uacute;c chương tr&igrave;nh l&agrave;m việc, l&atilde;nh đạo hai đơn vị đ&atilde; thống nhất sẽ tiến h&agrave;nh k&yacute; bi&ecirc;n bản thỏa thuận hợp t&aacute;c để sớm triển khai v&agrave; cụ thể h&oacute;a c&aacute;c hoạt động hợp t&aacute;c giữa hai b&ecirc;n.</p>\n<p>Trung t&acirc;m Internet Việt Nam l&agrave; đơn vị sự nghiệp c&ocirc;ng lập trực thuộc Bộ Th&ocirc;ng tin v&agrave; Truyền th&ocirc;ng, c&oacute; chức năng quản l&yacute; (bao gồm: đăng k&yacute;, duy tr&igrave;, cấp, ph&acirc;n bổ, ngừng, tạm ngừng, thu hồi) v&agrave; th&uacute;c đẩy việc sử dụng t&agrave;i nguy&ecirc;n Internet ở Việt Nam; thiết lập, quản l&yacute;, vận h&agrave;nh v&agrave; khai th&aacute;c Hệ thống DNS quốc gia, Trạm trung chuyển Internet quốc gia (VNIX). Việc hợp t&aacute;c với VNNIC sẽ mở ra nhiều triển vọng để PTIT ph&aacute;t huy lợi thế trong sự nghiệp đ&agrave;o tạo v&agrave; ph&aacute;t triển nguồn nh&acirc;n lực chất lượng cao, nguồn nh&acirc;n lực c&oacute; kỹ năng số cho đất nước.</p>', 'Đoàn Công tác Trung tâm Internet Việt Nam thăm và làm việc tại Học viện Công nghệ Bưu chính Viễn thông', 1, 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1729610101/u2cxuqxpqnis9blnmq1g.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chuyen_nganh`
--

CREATE TABLE `chuyen_nganh` (
  `ma_chuyen_nganh` varchar(255) NOT NULL,
  `ten_chuyen_nganh` varchar(255) DEFAULT NULL,
  `ma_nganh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `chuyen_nganh`
--

INSERT INTO `chuyen_nganh` (`ma_chuyen_nganh`, `ten_chuyen_nganh`, `ma_nganh`) VALUES
('HTTT', 'Hệ thống thông tin', '7480210'),
('KHMT', 'Khoa học máy tính', '7480210'),
('KTMT', 'Kỹ thuật máy tính', '7480210'),
('KTPM', 'Kỹ thuật phần mềm', '7480210');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giang_vien`
--

CREATE TABLE `giang_vien` (
  `macb` bigint NOT NULL,
  `chuc_danh` varchar(255) DEFAULT NULL,
  `dang_hop_dong` varchar(255) DEFAULT NULL,
  `dien_thoai` varchar(255) DEFAULT NULL,
  `don_vi_cong_tac` varchar(255) DEFAULT NULL,
  `hoc_vi` varchar(255) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `tengv` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `chuyen_nganh` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `chuyen_nganh_ma_chuyen_nganh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `giang_vien`
--

INSERT INTO `giang_vien` (`macb`, `chuc_danh`, `dang_hop_dong`, `dien_thoai`, `don_vi_cong_tac`, `hoc_vi`, `ngay_sinh`, `tengv`, `user_id`, `chuyen_nganh`, `email`, `chuyen_nganh_ma_chuyen_nganh`) VALUES
(11111, 'giảng viên', 'Cơ hữu', '0973289423', 'Khoa điện tử viễn thông', 'Tiến sĩ', '1997-10-12', 'Bùi Công Giao', 3, 'HTTT', NULL, 'KHMT'),
(11112, 'giảng viên', 'Cơ hữu', '0973289421', 'Khoa điện tử viễn thông', 'Tiến sĩ', '2024-10-09', 'Bùi Đình Thắng', 2, 'HTTT', NULL, 'HTTT'),
(11114, 'giảng viên', 'Cơ hữu', '0332547222', 'Khoa điện tử viễn thông', 'Thạc sĩ', '2024-10-07', 'Hoàng minh tú', 4, 'KHMT', NULL, 'HTTT'),
(11115, 'Trưởng Bộ Môn', 'Cơ hữu', '0973289421', 'Khoa điện tử viễn thông', 'Tiến sĩ', '2024-10-16', 'Mai Hồng Vũ', 5, NULL, NULL, 'HTTT'),
(11116, 'Trưởng Bộ Môn', 'Cơ hữu', '0332547222', 'Khoa điện tử viễn thông', 'Thạc sĩ', '2024-10-09', 'Lê hoàng tú', 7, NULL, NULL, 'KHMT');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giang_vien_hoc_phan`
--

CREATE TABLE `giang_vien_hoc_phan` (
  `id` bigint NOT NULL,
  `ma_cb` bigint DEFAULT NULL,
  `ma_hp` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `giang_vien_hoc_phan`
--

INSERT INTO `giang_vien_hoc_phan` (`id`, `ma_cb`, `ma_hp`) VALUES
(1, 11112, 100001),
(3, 11112, 841022),
(4, 11111, 100000),
(5, 11111, 833070),
(6, 11111, 841022);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hoc_phan`
--

CREATE TABLE `hoc_phan` (
  `mahp` bigint NOT NULL,
  `he_so` float DEFAULT NULL,
  `so_tiet_ly_thuyet` int DEFAULT NULL,
  `so_tiet_thuc_hanh` int DEFAULT NULL,
  `so_tin_chi` int DEFAULT NULL,
  `tenhp` varchar(255) DEFAULT NULL,
  `tong_so_tiet` int DEFAULT NULL,
  `chuyen_nganh_ma_chuyen_nganh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `hoc_phan`
--

INSERT INTO `hoc_phan` (`mahp`, `he_so`, `so_tiet_ly_thuyet`, `so_tiet_thuc_hanh`, `so_tin_chi`, `tenhp`, `tong_so_tiet`, `chuyen_nganh_ma_chuyen_nganh`) VALUES
(100000, 1, 45, 0, 3, 'Công nghệ thông tin và kỷ nguyên số', 45, 'HTTT'),
(100001, 1, 45, 0, 3, 'Giới thiệu ngành CNTT', 45, NULL),
(833070, 1, 30, 0, 2, 'Tin học ứng dụng (QTKD)', 30, 'KHMT'),
(841021, 0.75, 30, 30, 3, 'Kiến trúc máy tính', 60, 'KTMT'),
(841022, 0.75, 30, 30, 3, 'Hệ điều hành', 60, 'HTTT'),
(841040, 0.75, 30, 30, 3, 'Kỹ thuật lập trình (cũ)', 60, NULL),
(841044, 0.8, 45, 30, 4, 'Lập trình hướng đối tượng', 75, NULL),
(841046, 0.75, 30, 30, 3, 'Phát triển ứng dụng web 2', 60, NULL),
(841047, 0.8, 45, 30, 4, 'Công nghệ phần mềm', 75, NULL),
(841048, 0.8, 45, 30, 4, 'Phân tích thiết kế HTTT', 75, NULL),
(841051, 0.75, 30, 30, 3, 'Thiết kế giao diện', 60, NULL),
(841052, 0.75, 30, 30, 3, 'Xây dựng phần mềm theo mô hình phân lớp', 60, NULL),
(841058, 0.75, 30, 30, 3, 'Hệ điều hành mã nguồn mở', 60, NULL),
(841059, 0.75, 30, 30, 3, 'Quản trị mạng', 60, NULL),
(841061, 0.75, 30, 30, 3, 'Mạng máy tính nâng cao (cũ)', 60, NULL),
(841062, 0.75, 30, 30, 3, 'Quản lý dự án công nghệ thông tin', 60, NULL),
(841065, 0.75, 30, 30, 3, 'Các hệ quản trị cơ sở dữ liệu', 60, NULL),
(841067, 0.8, 30, 30, 3, 'Thương mại điện tử & ứng dụng', 60, NULL),
(841068, 0.75, 30, 30, 3, 'Hệ thống thông tin doanh nghiệp', 60, NULL),
(841070, 1, 18, 0, 6, 'Thực tập tốt nghiệp (8 tuần)', 18, NULL),
(841071, 1, 30, 15, 3, 'Dịch vụ web & ứng dụng', 45, NULL),
(841072, 0.75, 30, 30, 3, 'Các công nghệ lập trình hiện đại', 60, NULL),
(841076, 0.75, 30, 30, 3, 'Công nghệ phần mềm nâng cao', 60, NULL),
(841101, 1, 60, 0, 4, 'Đại số', 60, NULL),
(841103, 0.75, 30, 30, 3, 'Lý thuyết đồ thị (cũ)', 60, NULL),
(841107, 0.8, 45, 30, 4, 'Lập trình Java', 75, NULL),
(841108, 0.8, 45, 30, 4, 'Cấu trúc dữ liệu và giải thuật', 75, 'HTTT'),
(841109, 0.8, 45, 30, 4, 'Cơ sở dữ liệu', 75, NULL),
(841110, 0.8, 45, 30, 4, 'Cơ sở trí tuệ nhân tạo', 75, NULL),
(841111, 0.8, 45, 30, 4, 'Phân tích thiết kế hướng đối tượng', 75, NULL),
(841113, 0.75, 30, 30, 3, 'Phát triển phần mềm mã nguồn mở', 60, NULL),
(841114, 0.75, 30, 30, 3, 'Phát triển ứng dụng trên thiết bị di động (cũ)', 60, NULL),
(841116, 0.75, 30, 30, 3, 'Đồ họa máy tính', 60, NULL),
(841119, 0.8, 45, 30, 4, 'An ninh mạng máy tính', 75, NULL),
(841120, 0.75, 30, 30, 3, 'An toàn bảo mật dữ liệu trong HTTT', 60, NULL),
(841121, 0.8, 45, 30, 4, 'Cơ sở dữ liệu phân tán', 75, NULL),
(841301, 1, 60, 0, 4, 'Giải tích', 60, NULL),
(841302, 0.8, 45, 30, 4, 'Cơ sở lập trình', 75, 'KHMT'),
(841303, 0.8, 45, 30, 4, 'Kỹ thuật lập trình', 75, 'HTTT'),
(841304, 0.75, 30, 30, 3, 'Phát triển ứng dụng web 1', 60, NULL),
(841307, 0.75, 30, 30, 3, 'Lập trình mạng', 60, NULL),
(841308, 0.75, 30, 30, 3, 'Khai phá dữ liệu', 60, NULL),
(841309, 1, 45, 0, 3, 'Toán rời rạc', 45, NULL),
(841310, 1, 45, 0, 3, 'Lý thuyết đồ thị', 45, NULL),
(841311, 1, 45, 0, 3, 'Tiếng Anh B1-1', 45, NULL),
(841312, 1, 45, 0, 3, 'Tiếng Anh B1-2', 45, NULL),
(841313, 1, 45, 0, 3, 'Tiếng Anh B2-1', 45, NULL),
(841314, 1, 45, 0, 3, 'Tiếng Anh B2-2', 45, NULL),
(841315, 1, 45, 0, 3, 'Kỹ năng nghề nghiệp ngành CNTT', 45, NULL),
(841316, 0.75, 30, 30, 3, 'Kiến thức nền tảng về bảo mật', 60, NULL),
(841317, 1, 45, 0, 3, 'Đồ án chuẩn bị tốt nghiệp', 45, NULL),
(841318, 0.75, 30, 30, 3, 'Phát triển hệ thống nhúng', 60, NULL),
(841319, 0.75, 30, 30, 3, 'An toàn mạng không dây và di động', 60, NULL),
(841320, 0.75, 30, 30, 3, 'Phát triển ứng dụng internet of things', 60, NULL),
(841321, 0.75, 30, 30, 3, 'Thiết kế hệ thống mạng', 60, NULL),
(841322, 1, 60, 0, 4, 'Máy học', 60, NULL),
(841323, 0.75, 30, 30, 3, 'Điện toán đám mây', 60, NULL),
(841324, 1, 30, 0, 2, 'Phương pháp luận nghiên cứu khoa học', 30, NULL),
(841328, 1, 60, 0, 4, 'Seminar Công nghệ phần mềm', 60, NULL),
(841401, 1, 45, 0, 3, 'Giải tích 1', 45, NULL),
(841402, 1, 45, 0, 3, 'Đại số tuyến tính', 45, NULL),
(841403, 1, 60, 0, 4, 'Cấu trúc rời rạc', 60, 'KTPM'),
(841404, 0.75, 30, 30, 3, 'Mạng máy tính', 60, 'HTTT'),
(841405, 1, 45, 0, 3, 'Xác suất thống kê', 45, NULL),
(841406, 1, 45, 0, 3, 'Giải tích 2', 45, NULL),
(841407, 0.8, 45, 30, 4, 'Các hệ quản trị cơ sở dữ liệu (2020)', 75, NULL),
(841408, 0.8, 45, 30, 4, 'Kiểm thử phần mềm', 75, NULL),
(841409, 1, 60, 0, 4, 'Mạng máy tính nâng cao', 60, NULL),
(841410, 0.8, 45, 30, 4, 'An ninh mạng máy tính (2020)', 75, NULL),
(841411, 0.8, 45, 30, 4, 'Quản trị mạng (2020)', 75, NULL),
(841413, 0.8, 45, 30, 4, 'Cơ sở dữ liệu phân tán (2020)', 75, NULL),
(841414, 1, 45, 0, 3, 'Thiết kế và phân tích giải thuật', 45, NULL),
(841415, 1, 30, 0, 2, 'Luật pháp và CNTT', 30, NULL),
(841417, 0.67, 15, 30, 2, 'Mỹ thuật ứng dụng trong CNTT', 45, 'KHMT'),
(841419, 0.8, 45, 30, 4, 'Lập trình web và ứng dụng', 75, NULL),
(841422, 0.8, 45, 30, 4, 'Ngôn ngữ lập trình Python', 75, NULL),
(841423, 0.8, 45, 30, 4, 'Ngôn ngữ Lập trình c#', 75, NULL),
(841429, 0.8, 45, 30, 4, 'Cơ sở dữ liệu nâng cao', 75, NULL),
(841430, 1, 30, 0, 2, 'Nguyên lý và phương pháp lập trình', 30, NULL),
(841431, 0.8, 45, 30, 4, 'Quản lý dự án phần mềm', 75, NULL),
(841432, 0.8, 45, 30, 4, 'Phân tích dữ liệu', 75, NULL),
(841434, 0.8, 45, 30, 4, 'Thương mại diện tử và ứng dụng', 75, NULL),
(841438, 0.8, 45, 30, 4, 'Lập trình ứng dụng mạng', 75, NULL),
(841439, 0.8, 45, 30, 4, 'Mạng không dây', 75, NULL),
(841440, 0.8, 45, 30, 4, 'Phân tích và thiết kế mạng máy tính', 75, NULL),
(841442, 1, 45, 0, 3, 'Mạng đa phương tiện và di động', 45, NULL),
(841443, 1, 45, 0, 3, 'Phân tích mạng truyền thông và xã hội', 45, NULL),
(841444, 1, 45, 0, 3, 'Quản trị và bảo trì hệ thống', 45, NULL),
(841445, 1, 45, 0, 3, 'Hệ thống ảo và khả năng mở rộng dữ liệu', 45, NULL),
(841446, 0.8, 45, 30, 4, 'Phân tích và xử lý ảnh', 75, NULL),
(841447, 0.8, 45, 30, 4, 'Khai thác dữ liệu và ứng dụng', 75, NULL),
(841448, 0.8, 45, 30, 4, 'Xử lý ngôn ngữ tự nhiên', 75, NULL),
(841449, 0.8, 45, 30, 4, 'Nhập môn máy học', 75, NULL),
(841452, 1, 45, 0, 3, 'Tính toán thông minh', 45, NULL),
(841453, 0.8, 45, 30, 4, 'Phân tích và nhận dạng mẫu', 75, NULL),
(841456, 0.8, 45, 30, 4, 'Công nghệ tri thức', 75, NULL),
(841457, 0.8, 45, 30, 4, 'Học Sâu', 75, NULL),
(841458, 0.8, 45, 30, 4, 'Trí tuệ nhân tạo nâng cao', 75, NULL),
(841461, 0.8, 45, 30, 4, 'Nhập môn phát triển ứng dụng trên thiết bị di động', 75, NULL),
(841462, 0.8, 45, 30, 4, 'Phát triển ứng dụng trên thiết bị di động', 75, NULL),
(841463, 0.8, 45, 30, 4, 'Phát triển ứng dụng trên thiết bị di động nâng cao', 75, NULL),
(841464, 0.8, 45, 30, 4, 'Lập trình web và ứng dụng nâng cao', 75, NULL),
(841467, 0.8, 45, 30, 4, 'Công nghệ .NET', 75, NULL),
(841468, 0.8, 45, 30, 4, 'Chuyên đề J2EE', 75, NULL),
(841476, 1, 60, 0, 4, 'Đồ án chuyên ngành', 60, NULL),
(841479, 0.8, 45, 30, 4, 'Kiến trúc phần mềm', 75, NULL),
(841480, 0.8, 45, 30, 4, 'Xây dựng phần mềm theo mô hình phân lớp (2020)', 75, NULL),
(841481, 0.8, 45, 30, 4, 'Thiết kế giao diện (2020)', 75, NULL),
(841482, 1, 45, 0, 3, 'Seminar chuyên đề', 45, NULL),
(841483, 1, 60, 0, 4, 'Mạng đa phương tiện và di động (KTPM)', 60, NULL),
(848010, 1, 45, 0, 4, 'Giải tích số', 60, NULL),
(848013, 1, 30, 15, 3, 'Kiến trúc máy tính và mạng máy tính', 45, NULL),
(848024, 1, 30, 15, 3, 'Bảo mật mạng máy tính', 45, NULL),
(848028, 0.8, 45, 30, 4, 'Phân tích và xử lý ảnh (Toán UD)', 75, NULL),
(848301, 1, 0, 30, 2, 'Seminar chuyên đề tin học 2', 30, NULL),
(848411, 0.8, 45, 30, 4, 'Seminar chuyên đề tin học 2', 75, NULL),
(848412, 1, 60, 0, 4, 'Máy học (ToanUD)', 60, NULL),
(848416, 1, 45, 0, 3, 'Khai thác dữ liệu (ToanUD)', 45, NULL),
(858009, 0.8, 45, 30, 4, 'Cơ sở lập trình (KHDL)', 75, NULL),
(858010, 0.8, 45, 30, 4, 'Cấu trúc dữ liệu và giải thuật (KHDL)', 75, NULL),
(858011, 0.75, 30, 30, 3, 'Phương pháp lập trình hướng đối tượng (KHDL)', 60, NULL),
(858014, 0.75, 30, 30, 3, 'Lập trình Python cơ bản (KHDL)', 60, NULL),
(858015, 0.75, 30, 30, 3, 'Máy học (KHDL)', 60, NULL),
(861001, 1, 75, 0, 5, 'Những nguyên lí cơ bản của Chủ nghĩa Mác – Lênin', 75, NULL),
(861002, 1, 30, 0, 2, 'Tư tưởng Hồ Chí Minh', 30, NULL),
(861003, 1, 45, 0, 3, 'Đường lối cách mạng của ĐCSVN', 45, NULL),
(862101, 0, 0, 30, 1, 'Giáo dục thể chất 1', 30, NULL),
(862102, 0, 0, 30, 1, 'Giáo dục thể chất 2', 30, NULL),
(862103, 0, 0, 30, 1, 'Giáo dục thể chất 3', 30, NULL),
(862306, 0, 30, 0, 2, 'Giáo dục quốc phòng và an ninh 1', 30, NULL),
(862307, 0, 30, 0, 2, 'Giáo dục quốc phòng và an ninh 2', 30, NULL),
(862308, 0, 20, 65, 3, 'Giáo dục quốc phòng và an ninh 3', 85, NULL),
(862309, 0, 10, 10, 1, 'Giáo dục quốc phòng và an ninh 4', 20, NULL),
(864001, 1, 45, 0, 3, 'Xác suất thống kê A', 45, 'KTMT'),
(865006, 1, 30, 0, 2, 'Pháp luật đại cương', 30, 'KTPM');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ke_hoach_mo_mon`
--

CREATE TABLE `ke_hoach_mo_mon` (
  `id` bigint NOT NULL,
  `so_luong_sinh_vien_nhom` int DEFAULT NULL,
  `tong_so_nhom` int DEFAULT NULL,
  `mahp` bigint DEFAULT NULL,
  `khoa_hoc` varchar(255) DEFAULT NULL,
  `nam_hoc` bigint DEFAULT NULL,
  `lop_hoc` varchar(255) DEFAULT NULL,
  `tong_so_sinh_vien` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `ke_hoach_mo_mon`
--

INSERT INTO `ke_hoach_mo_mon` (`id`, `so_luong_sinh_vien_nhom`, `tong_so_nhom`, `mahp`, `khoa_hoc`, `nam_hoc`, `lop_hoc`, `tong_so_sinh_vien`) VALUES
(2, 75, 4, 833070, 'CNTT19', 2, NULL, NULL),
(4, 60, 10, 841021, 'CNTT24', 1, NULL, NULL),
(5, 90, 6, 841403, 'CNTT24', 1, NULL, NULL),
(6, 85, 6, 100000, 'CNTT24', 1, NULL, NULL),
(7, 90, 2, 841417, 'CNTT23', 1, NULL, NULL),
(8, 50, 12, 841303, 'CNTT24', 2, NULL, NULL),
(9, 50, 10, 841404, 'CNTT24', 2, NULL, NULL),
(10, 90, 7, 841108, 'CNTT24', 2, NULL, NULL),
(11, 50, 10, 841022, 'CNTT24', 3, NULL, NULL),
(13, 50, 12, 841302, 'CNTT24', 1, NULL, 580);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ke_hoach_mo_mon_nganh`
--

CREATE TABLE `ke_hoach_mo_mon_nganh` (
  `id` bigint NOT NULL,
  `ke_hoach_mo_mon_id` bigint DEFAULT NULL,
  `nganh_ma_nganh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `ke_hoach_mo_mon_nganh`
--

INSERT INTO `ke_hoach_mo_mon_nganh` (`id`, `ke_hoach_mo_mon_id`, `nganh_ma_nganh`) VALUES
(3, 11, '7480103'),
(4, 11, '7480107'),
(5, 10, '7480210'),
(6, 10, '7480103'),
(19, 13, '7480103'),
(20, 13, '7480107');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khoa_hoc`
--

CREATE TABLE `khoa_hoc` (
  `ma_khoa_hoc` varchar(255) NOT NULL,
  `ten_khoa_hoc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `khoa_hoc`
--

INSERT INTO `khoa_hoc` (`ma_khoa_hoc`, `ten_khoa_hoc`) VALUES
('CNNT25', '25'),
('CNTT17', 'CNTT Khóa 17 '),
('CNTT18', 'CNTT Khóa 18'),
('CNTT19', 'Khóa 19'),
('CNTT20', 'CNTT Khóa 20'),
('CNTT21', 'CNTT Khóa 21'),
('CNTT22', 'CNTT Khóa 22'),
('CNTT23', 'Khóa 23'),
('CNTT24', '24');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lop_hoc`
--

CREATE TABLE `lop_hoc` (
  `ma_lop` varchar(255) NOT NULL,
  `khoa` varchar(255) DEFAULT NULL,
  `nganh_dao_tao` varchar(255) DEFAULT NULL,
  `sosvhien_co` int DEFAULT NULL,
  `sosvnam` int DEFAULT NULL,
  `sosvnu` int DEFAULT NULL,
  `sosvthang_truoc` int DEFAULT NULL,
  `ten_lop` varchar(255) DEFAULT NULL,
  `khoa_hoc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nam_hoc`
--

CREATE TABLE `nam_hoc` (
  `id` bigint NOT NULL,
  `hoc_ky` varchar(255) DEFAULT NULL,
  `ten_nam_hoc` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `nam_hoc`
--

INSERT INTO `nam_hoc` (`id`, `hoc_ky`, `ten_nam_hoc`) VALUES
(1, 'HK1', '2024-2025'),
(2, 'HK2', '2024-2025'),
(3, 'HK3', '2024-2025');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nganh`
--

CREATE TABLE `nganh` (
  `ma_nganh` varchar(255) NOT NULL,
  `ten_nganh` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `nganh`
--

INSERT INTO `nganh` (`ma_nganh`, `ten_nganh`) VALUES
('52480201', 'CNTT CLC'),
('7480103', 'KTPM'),
('7480107', 'TTNT'),
('7480210', 'CNTT');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_cong_giang_vien`
--

CREATE TABLE `phan_cong_giang_vien` (
  `id` bigint NOT NULL,
  `so_nhom` int DEFAULT NULL,
  `macb` bigint DEFAULT NULL,
  `ke_hoach_mo_mon` bigint DEFAULT NULL,
  `ngay_cap_nhat` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `phan_cong_giang_vien`
--

INSERT INTO `phan_cong_giang_vien` (`id`, `so_nhom`, `macb`, `ke_hoach_mo_mon`, `ngay_cap_nhat`) VALUES
(7, 2, 11112, 11, '2024-10-08 09:28:37'),
(8, 1, 11111, 11, '2024-10-08 10:01:05'),
(10, 3, 11114, 9, '2024-10-08 21:06:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `actived` bit(1) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_key` varchar(255) DEFAULT NULL,
  `authority_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `actived`, `avatar`, `created_date`, `email`, `full_name`, `password`, `remember_key`, `authority_name`) VALUES
(1, b'1', NULL, '2024-10-06', 'admin@gmail.com', 'ADMIN', '$2a$10$nlPaQzY18JiWWT/EFxtqouroz87o3fJR8PGTHggxd0lCtYW4w.zC6', NULL, 'ROLE_ADMIN'),
(2, b'1', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1728287551/a8diq1tribl4s4nnheix.png', '2024-10-07', 'hieutran02102804@gmail.com', 'Trần trung hải', '$2a$10$EaK1dErAs6epHTkTMcUL6./tj2rBh1rC1hfAbAP7cFXMXrAyHDT5i', NULL, 'ROLE_TEACHER'),
(3, b'1', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1728287580/uz4dbac6xmcmfxo2pw2l.jpg', '2024-10-07', 'dev002102@gmail.com', 'Hoàng thị hoài', '$2a$10$zHvtkQ3QJB/.iG5hBo2Wxus6m2fVl5iFai4P1tjpEr9D5ICGk.mDG', NULL, 'ROLE_TEACHER'),
(4, b'1', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1728395949/uoz5emtunuo1hfnoagup.jpg', '2024-10-08', 'hoangducts247@gmail.com', 'Trần tùng lâm', '$2a$10$TV.LJjgHLE8LSbAUeXECxech2P0g5X5RjrbiJgN3JADxS08c9RAQS', NULL, 'ROLE_TEACHER'),
(5, b'1', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1729583967/gpgwgumrwlugj84yyujc.png', '2024-10-22', 'maihongvu@gmail.com', 'Mai Hồng Vũ', '$2a$10$W4ulNG2hbgohAXKbuurik.ApVT4ansgeHVu8ykS9M3vjWQe2paBom', NULL, 'ROLE_HEAD_DEPARTMENT'),
(6, b'1', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1729605558/xqokxqaoinuldktmo9sd.jpg', '2024-10-22', 'nam@gmail.com', 'Trần nam', '$2a$10$B/oWFpv9Y7XwyfDgxK0RZuEOPt4gqXJrpjjLLrNkDDIV9XEWqlMMi', NULL, 'ROLE_TEACHER'),
(7, b'1', 'http://res.cloudinary.com/dxqh3xpza/image/upload/v1729605591/bblm8om0p5qrxjmcjsfg.jpg', '2024-10-22', 'tulh@gmail.com', 'Lê hoàng tú', '$2a$10$N2O9nWToLdKRFYazp5HyHOPYB42I7hG8XMva3HQogFg8d0nEUeo7i', NULL, 'ROLE_HEAD_DEPARTMENT');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `authority`
--
ALTER TABLE `authority`
  ADD PRIMARY KEY (`name`);

--
-- Chỉ mục cho bảng `bai_viet`
--
ALTER TABLE `bai_viet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKjotgbo8vql8u2t00yrv4cepmb` (`user_id`);

--
-- Chỉ mục cho bảng `chuyen_nganh`
--
ALTER TABLE `chuyen_nganh`
  ADD PRIMARY KEY (`ma_chuyen_nganh`),
  ADD KEY `FKtjuk06aykiayy0kjtd0s3mvu7` (`ma_nganh`);

--
-- Chỉ mục cho bảng `giang_vien`
--
ALTER TABLE `giang_vien`
  ADD PRIMARY KEY (`macb`),
  ADD KEY `FKi03nexh9pery1x644404g084r` (`user_id`),
  ADD KEY `FKoaoxxaw1myt8e90ylpjmlu4x4` (`chuyen_nganh`);

--
-- Chỉ mục cho bảng `giang_vien_hoc_phan`
--
ALTER TABLE `giang_vien_hoc_phan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKcm6hal7q3k1ygpt8kvo71kjr2` (`ma_cb`),
  ADD KEY `FKo0ncljrdymmh2n9laasxnjsua` (`ma_hp`);

--
-- Chỉ mục cho bảng `hoc_phan`
--
ALTER TABLE `hoc_phan`
  ADD PRIMARY KEY (`mahp`),
  ADD KEY `FKf208y6pumwqa78vrxjle95ulb` (`chuyen_nganh_ma_chuyen_nganh`);

--
-- Chỉ mục cho bảng `ke_hoach_mo_mon`
--
ALTER TABLE `ke_hoach_mo_mon`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKavq64bt3832yiefr50nlbw0pp` (`mahp`),
  ADD KEY `FKtirrqylb72j3tsqj0y4fitae8` (`khoa_hoc`),
  ADD KEY `FKmtltlxbvdb0my5krcj95jvv0n` (`nam_hoc`),
  ADD KEY `FKqkhbpu3u3hclao9rivj8nnfqe` (`lop_hoc`);

--
-- Chỉ mục cho bảng `ke_hoach_mo_mon_nganh`
--
ALTER TABLE `ke_hoach_mo_mon_nganh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKeucdo753nmofo8b8sq7kh0gsq` (`ke_hoach_mo_mon_id`),
  ADD KEY `FKc41lt4o2g317hq7kadmpkeqtg` (`nganh_ma_nganh`);

--
-- Chỉ mục cho bảng `khoa_hoc`
--
ALTER TABLE `khoa_hoc`
  ADD PRIMARY KEY (`ma_khoa_hoc`);

--
-- Chỉ mục cho bảng `lop_hoc`
--
ALTER TABLE `lop_hoc`
  ADD PRIMARY KEY (`ma_lop`),
  ADD KEY `FKt48r76uubutsod4xcgmdpbc2t` (`khoa_hoc`);

--
-- Chỉ mục cho bảng `nam_hoc`
--
ALTER TABLE `nam_hoc`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nganh`
--
ALTER TABLE `nganh`
  ADD PRIMARY KEY (`ma_nganh`);

--
-- Chỉ mục cho bảng `phan_cong_giang_vien`
--
ALTER TABLE `phan_cong_giang_vien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKk10j8rf72os0vwsv3mi73udie` (`macb`),
  ADD KEY `FKhgwujdecfaylrgmsns4h2hxmo` (`ke_hoach_mo_mon`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq6r7e19l5xjmty0j0w6i2inlv` (`authority_name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bai_viet`
--
ALTER TABLE `bai_viet`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `giang_vien_hoc_phan`
--
ALTER TABLE `giang_vien_hoc_phan`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `ke_hoach_mo_mon`
--
ALTER TABLE `ke_hoach_mo_mon`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `ke_hoach_mo_mon_nganh`
--
ALTER TABLE `ke_hoach_mo_mon_nganh`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `nam_hoc`
--
ALTER TABLE `nam_hoc`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `phan_cong_giang_vien`
--
ALTER TABLE `phan_cong_giang_vien`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bai_viet`
--
ALTER TABLE `bai_viet`
  ADD CONSTRAINT `FKjotgbo8vql8u2t00yrv4cepmb` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `chuyen_nganh`
--
ALTER TABLE `chuyen_nganh`
  ADD CONSTRAINT `FKtjuk06aykiayy0kjtd0s3mvu7` FOREIGN KEY (`ma_nganh`) REFERENCES `nganh` (`ma_nganh`);

--
-- Các ràng buộc cho bảng `giang_vien`
--
ALTER TABLE `giang_vien`
  ADD CONSTRAINT `FKi03nexh9pery1x644404g084r` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKoaoxxaw1myt8e90ylpjmlu4x4` FOREIGN KEY (`chuyen_nganh`) REFERENCES `chuyen_nganh` (`ma_chuyen_nganh`);

--
-- Các ràng buộc cho bảng `giang_vien_hoc_phan`
--
ALTER TABLE `giang_vien_hoc_phan`
  ADD CONSTRAINT `FKcm6hal7q3k1ygpt8kvo71kjr2` FOREIGN KEY (`ma_cb`) REFERENCES `giang_vien` (`macb`),
  ADD CONSTRAINT `FKo0ncljrdymmh2n9laasxnjsua` FOREIGN KEY (`ma_hp`) REFERENCES `hoc_phan` (`mahp`);

--
-- Các ràng buộc cho bảng `hoc_phan`
--
ALTER TABLE `hoc_phan`
  ADD CONSTRAINT `FKf208y6pumwqa78vrxjle95ulb` FOREIGN KEY (`chuyen_nganh_ma_chuyen_nganh`) REFERENCES `chuyen_nganh` (`ma_chuyen_nganh`);

--
-- Các ràng buộc cho bảng `ke_hoach_mo_mon`
--
ALTER TABLE `ke_hoach_mo_mon`
  ADD CONSTRAINT `FKavq64bt3832yiefr50nlbw0pp` FOREIGN KEY (`mahp`) REFERENCES `hoc_phan` (`mahp`),
  ADD CONSTRAINT `FKmtltlxbvdb0my5krcj95jvv0n` FOREIGN KEY (`nam_hoc`) REFERENCES `nam_hoc` (`id`),
  ADD CONSTRAINT `FKqkhbpu3u3hclao9rivj8nnfqe` FOREIGN KEY (`lop_hoc`) REFERENCES `lop_hoc` (`ma_lop`),
  ADD CONSTRAINT `FKtirrqylb72j3tsqj0y4fitae8` FOREIGN KEY (`khoa_hoc`) REFERENCES `khoa_hoc` (`ma_khoa_hoc`);

--
-- Các ràng buộc cho bảng `ke_hoach_mo_mon_nganh`
--
ALTER TABLE `ke_hoach_mo_mon_nganh`
  ADD CONSTRAINT `FKc41lt4o2g317hq7kadmpkeqtg` FOREIGN KEY (`nganh_ma_nganh`) REFERENCES `nganh` (`ma_nganh`),
  ADD CONSTRAINT `FKeucdo753nmofo8b8sq7kh0gsq` FOREIGN KEY (`ke_hoach_mo_mon_id`) REFERENCES `ke_hoach_mo_mon` (`id`);

--
-- Các ràng buộc cho bảng `lop_hoc`
--
ALTER TABLE `lop_hoc`
  ADD CONSTRAINT `FKt48r76uubutsod4xcgmdpbc2t` FOREIGN KEY (`khoa_hoc`) REFERENCES `khoa_hoc` (`ma_khoa_hoc`);

--
-- Các ràng buộc cho bảng `phan_cong_giang_vien`
--
ALTER TABLE `phan_cong_giang_vien`
  ADD CONSTRAINT `FKhgwujdecfaylrgmsns4h2hxmo` FOREIGN KEY (`ke_hoach_mo_mon`) REFERENCES `ke_hoach_mo_mon` (`id`),
  ADD CONSTRAINT `FKk10j8rf72os0vwsv3mi73udie` FOREIGN KEY (`macb`) REFERENCES `giang_vien` (`macb`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKq6r7e19l5xjmty0j0w6i2inlv` FOREIGN KEY (`authority_name`) REFERENCES `authority` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
