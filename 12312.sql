-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 01, 2020 lúc 09:59 AM
-- Phiên bản máy phục vụ: 10.4.16-MariaDB
-- Phiên bản PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `12312`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `info_config`
--

CREATE TABLE `info_config` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `conten_config` varchar(255) DEFAULT NULL,
  `created_config` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `info_config`
--

INSERT INTO `info_config` (`id`, `title`, `conten_config`, `created_config`) VALUES
(1, 'KEY', 'h0c l0 c() viek', '2020-11-12 14:08:07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `news_shop`
--

CREATE TABLE `news_shop` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `content_news` varchar(2000) DEFAULT NULL,
  `id_Shop` int(11) DEFAULT NULL,
  `created_news` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `news_shop`
--

INSERT INTO `news_shop` (`id`, `title`, `image`, `content_news`, `id_Shop`, `created_news`) VALUES
(1, '4444', '5555', '6666', 1, '2020-11-10 13:56:09'),
(3, '3333', '4444', '5555', 1, '2020-11-11 07:38:18'),
(4, '3333', '1212', '12', 1, '2020-11-19 12:15:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `id_User` int(11) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL COMMENT 'người nhận',
  `sender` varchar(255) DEFAULT NULL COMMENT 'người gửi',
  `date_notification` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `end_code` varchar(16) DEFAULT NULL COMMENT 'mã code giam giá',
  `title` varchar(255) DEFAULT NULL,
  `number` int(20) DEFAULT NULL COMMENT 'ưu đải theo %',
  `date_favorable` datetime DEFAULT NULL COMMENT ' từ ngày',
  `come_date` datetime DEFAULT NULL COMMENT 'đến ngày',
  `created_special` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `promotion`
--

INSERT INTO `promotion` (`id`, `end_code`, `title`, `number`, `date_favorable`, `come_date`, `created_special`) VALUES
(1, NULL, 'qqqqq', 3, '2020-11-10 00:00:00', '2020-12-30 00:00:00', '2020-10-27 10:11:20'),
(3, NULL, 'asd', 3, '2020-11-30 00:00:00', '2020-11-30 00:00:00', '2020-11-19 11:50:10'),
(4, 'onSqSpGb', 'asd', 3, '2020-11-30 00:00:00', '2020-11-30 00:00:00', '2020-11-19 11:56:32'),
(5, 'HyGX5Kjy', 'asd', 3, '2020-11-30 00:00:00', '2020-11-30 00:00:00', '2020-11-19 11:59:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `created_at`) VALUES
(1, 'admin', '2020-11-02 10:40:01'),
(2, 'nhân viên', '2020-11-02 10:40:01'),
(3, 'Khách hàng', '2020-11-02 10:40:22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `code_schedule` varchar(16) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL COMMENT 'thời gian làm',
  `end_time` datetime DEFAULT NULL COMMENT 'thời gian kết thúc',
  `content_schedule` varchar(1000) DEFAULT NULL,
  `moneys` int(11) NOT NULL DEFAULT 0 COMMENT 'tông tiền',
  `minus_point` int(11) NOT NULL DEFAULT 0 COMMENT 'điểm đc trừ',
  `status` tinyint(4) DEFAULT NULL COMMENT '0. kh tạo(chơ sư lý)\r\n1. kh huỷ\r\n2. nv nhận\r\n3. nv huy don\r\n4. đơn hoàn thành',
  `phone_nv` varchar(13) DEFAULT NULL,
  `id_User` int(11) DEFAULT NULL,
  `id_Shop` int(11) DEFAULT NULL,
  `id_promotion` int(11) DEFAULT NULL,
  `created_schedule` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `schedule`
--

INSERT INTO `schedule` (`id`, `code_schedule`, `start_time`, `end_time`, `content_schedule`, `moneys`, `minus_point`, `status`, `phone_nv`, `id_User`, `id_Shop`, `id_promotion`, `created_schedule`) VALUES
(70, 'Nt5E8XBnl1', '2020-11-15 19:00:13', '2020-11-15 21:30:13', '1111', 500000, 10, 2, '098765432', 33, 1, 1, '2020-11-18 16:17:29'),
(71, 'MhE8zPZ9My', '2020-11-15 19:00:13', '2020-11-15 21:30:13', '1111', 500000, 10, 2, '098765432', 33, 1, 1, '2020-11-18 16:36:58'),
(72, '0uZ0e5iM5L', '2020-11-16 19:00:13', '2020-11-16 21:30:13', '1111', 500000, 10, 2, '098765432', 35, 1, 1, '2020-11-18 16:44:09'),
(73, 'mYOYVjjVxp', '2020-11-17 19:00:13', '2020-11-17 21:30:13', '1111', 500000, 10, 2, '098765432', 35, 1, 1, '2020-11-18 16:44:19'),
(74, 'afICGwIXxD', '2020-11-18 19:00:13', '2020-11-18 21:30:13', '1111', 500000, 10, 2, '098765432', 33, 1, 1, '2020-11-18 16:44:27'),
(75, 'OSYQ5ZoAdK', '2020-11-19 19:00:13', '2020-11-19 21:30:13', '1111', 500000, 10, 2, '098765432', 35, 1, 1, '2020-11-18 16:44:39'),
(76, 'Y9IojDUdrB', '2020-11-19 08:00:13', '2020-11-19 11:30:13', '1111', 500000, 10, 2, '098765432', 33, 1, 1, '2020-11-18 16:46:46'),
(77, '7EX8x1M22N', '2020-11-19 19:00:13', '2020-11-19 20:30:13', '1111', 500000, 10, 2, '098765432', 33, 1, 1, '2020-11-18 16:48:09'),
(78, 'HkkRHeaKgr', '2020-11-19 19:00:13', '2020-11-19 20:30:13', '1111', 500000, 15, 0, NULL, NULL, 1, 1, '2020-11-20 14:30:16'),
(79, '6ZKrZ3cpWg', '2020-11-19 19:00:13', '2020-11-19 20:30:13', '1111', 500000, 15, 0, NULL, NULL, 1, 1, '2020-11-20 14:32:33'),
(80, 'Ywg571kUfg', '2020-11-20 19:00:13', '2020-11-20 20:30:13', '1111', 500000, 15, 0, NULL, NULL, 1, 1, '2020-11-20 15:01:39'),
(81, '6JUV4SZq0K', '2020-11-20 13:00:13', '2020-11-20 14:30:13', '1111', 500000, 15, 0, NULL, NULL, 1, 1, '2020-11-20 15:02:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule_details`
--

CREATE TABLE `schedule_details` (
  `id` int(11) NOT NULL,
  `working_time` varchar(16) DEFAULT NULL,
  `phone_kh` varchar(13) DEFAULT NULL,
  `id_User` int(11) DEFAULT NULL,
  `id_Service_shop` int(11) DEFAULT NULL,
  `id_Schedule` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `schedule_details`
--

INSERT INTO `schedule_details` (`id`, `working_time`, `phone_kh`, `id_User`, `id_Service_shop`, `id_Schedule`) VALUES
(107, '19:00', '09876532', 43, 1, 72),
(108, '19:30', '09876532555', 43, 8, 72),
(109, '20:00', '09876532555', 43, 9, 72),
(110, '19:00', '09876532', 43, 1, 73),
(111, '19:30', '09876532555', 43, 8, 73),
(112, '20:00', '09876532555', 43, 9, 73),
(113, '19:00', '09876532', 43, 1, 74),
(114, '19:30', '09876532555', 43, 8, 74),
(115, '20:00', '09876532555', 43, 9, 74),
(116, '19:00', '09876532', 43, 1, 75),
(117, '19:30', '09876532555', 43, 8, 75),
(118, '20:00', '09876532555', 43, 9, 75),
(119, '08:00', '09876532', 43, 1, 76),
(120, '08:30', '09876532555', 43, 8, 76),
(121, '09:00', '09876532555', 43, 9, 76),
(122, '09:30', '09876532555', 43, 9, 76),
(123, '10:00', '09876532555', 43, 9, 76),
(124, '10:30', '09876532555', 43, 9, 76),
(125, '11:00', '09876532555', 43, 9, 76),
(126, '19:00', '09876532', 43, 1, 77),
(127, '19:30', '09876532555', 43, 8, 77),
(128, '20:00', '09876532555', 43, 9, 77),
(129, '19:00', '09876532', 43, 1, 78),
(130, '19:30', '09876532', 43, 8, 78),
(131, '20:00', '09876532', 43, 9, 78),
(132, '19:00', '09876532', 43, 1, 79),
(133, '19:30', '09876532', 43, 8, 79),
(134, '20:00', '09876532', 43, 9, 79),
(135, '19:00', '09876532', 43, 1, 80),
(136, '19:30', '09876532', 43, 8, 80),
(137, '20:00', '09876532', 43, 9, 80),
(138, '13:00', '09876532', 43, 1, 81),
(139, '13:30', '09876532', 43, 8, 81),
(140, '14:00', '09876532', 43, 9, 81);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule_historical`
--

CREATE TABLE `schedule_historical` (
  `id` int(11) NOT NULL,
  `end_code_schedule` varchar(16) DEFAULT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `is_status` tinyint(4) DEFAULT NULL COMMENT '1. nv làm đơn , 2. nv huỷ đơn',
  `id_User` int(11) DEFAULT NULL,
  `id_schedule` int(11) DEFAULT NULL,
  `created_historical` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `schedule_historical`
--

INSERT INTO `schedule_historical` (`id`, `end_code_schedule`, `content`, `is_status`, `id_User`, `id_schedule`, `created_historical`) VALUES
(14, 'afICGwIXxD', 'qưerty', 1, 33, 74, '2020-11-20 14:06:55'),
(15, 'MhE8zPZ9My', 'qưerty', 1, 33, 71, '2020-11-20 14:07:02'),
(16, 'Nt5E8XBnl1', 'qưerty', 1, 33, 70, '2020-11-20 14:07:12'),
(17, 'OSYQ5ZoAdK', 'qưerty', 2, 33, 75, '2020-11-20 14:07:24'),
(18, 'Y9IojDUdrB', 'qưerty', 2, 35, 76, '2020-11-20 14:14:49'),
(19, '0uZ0e5iM5L', 'qưerty', 1, 35, 72, '2020-11-20 14:17:08'),
(20, 'mYOYVjjVxp', 'qưerty', 1, 35, 73, '2020-11-20 14:17:11'),
(21, '7EX8x1M22N', 'qưerty', 1, 33, 77, '2020-11-20 14:18:01'),
(22, 'OSYQ5ZoAdK', 'qưerty', 1, 35, 75, '2020-11-20 14:18:29'),
(23, 'Y9IojDUdrB', 'qưerty', 1, 33, 76, '2020-11-20 14:18:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `service_shop`
--

CREATE TABLE `service_shop` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL COMMENT 'nội dung dịch vụ',
  `moneys_ser` int(11) DEFAULT 0 COMMENT 'tiền từng dv',
  `image` varchar(255) DEFAULT NULL,
  `created_at` int(10) DEFAULT NULL COMMENT 'tgian thuhc hien dv',
  `id_Shop` int(11) DEFAULT NULL,
  `created_translate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `service_shop`
--

INSERT INTO `service_shop` (`id`, `title`, `content`, `moneys_ser`, `image`, `created_at`, `id_Shop`, `created_translate`) VALUES
(1, 'Cắt da tay/chân', '1212eww', 50000, 'https://hocvienmyanh.vn/upload/sanpham/large/khoa-hoc-nail-ky-thuat-cat-da-kieu-nga-10-0.jpg', 10, 1, '2020-10-25 04:24:24'),
(8, 'asdas', '1212eww', 0, '12121', 30, 1, '2020-11-10 13:16:20'),
(9, 'Sơn gel', '1212eww', 130000, 'https://vnn-imgs-f.vgcloud.vn/2019/09/19/16/su-that-it-ai-biet-ve-son-mong-tay-khong-the-tay-gay-hai-cho-suc-khoe-nhu-the-nao.jpg', 30, 1, '2020-11-10 13:23:02'),
(10, 'French đầu móng', '1212eww', 70000, 'https://image-tmp.guu.vn/full/2017/05/20/4d0f99a2a8d177379a7c1a7dbfffc70861c42ce5.jpg', 80, 1, '2020-11-25 16:24:50'),
(11, 'Đắp gel', '1212eww', 300000, 'https://dotobjyajpegd.cloudfront.net/photo/5ee3343f8288b063aad1064e', 80, 1, '2020-11-25 16:30:36'),
(12, 'Đắp bột', '1212eww', 300000, 'https://trangbeautysalon.vn/wp-content/uploads/2020/02/dap-bot.jpg', 80, 1, '2020-11-25 16:30:37'),
(13, 'Đắp bột/gel ẩn kim tuyến', '1212eww', 350000, 'https://thebamboobeauty.iamsale.vn/upload/thebamboobeauty.iamsale.vn/hinh-anh-danh-muc-san-pham/images/2018-12/8630_1545615299.jpg', 90, 1, '2020-11-26 11:21:36'),
(14, 'Đắp bột đính hoa đá', '1212eww', 380000, 'https://kientrannail.com/upload/images/61.jpg', 110, 1, '2020-11-26 11:27:11'),
(15, 'Tháo sơn gel', '1212eww', 30000, 'https://nailzone.vn/wp-content/uploads/2016/11/nail2-re-768x498.jpg', 20, 1, '2020-11-26 11:27:23'),
(16, 'Tháo gel đắp,bột đắp', '1212eww', 50000, 'https://nailzone.vn/wp-content/uploads/2018/04/1200-175178591-acrylic-painting-on-nails-768x512.jpg', 30, 1, '2020-11-26 11:31:01'),
(17, 'Tẩy tế bào chết', '1212eww', 30000, 'https://www.maihan.vn/images/_thumbs/tri_mun_1.jpg', 15, 1, '2020-11-26 11:31:10'),
(18, 'Đắp mặt nạ orrganic', '1212eww', 50000, 'https://cdn.tgdd.vn/Files/2019/12/04/1224697/nhung-loi-co-ban-khi-dap-mat-na-ma-nhieu-chi-em-mac-phai-201912041024372293.jpg', 20, 1, '2020-11-26 11:40:32'),
(19, 'Massage mặt chuyên sâu', '1212eww', 220000, 'https://misstram.edu.vn/wp-content/uploads/2019/10/luu-y-khi-massage-da-mat.jpg', 60, 1, '2020-11-26 11:43:30'),
(20, 'Trị mụn tiêu viêm', '1212eww', 490000, 'https://suckhoe123.vn/uploads/lam-dep/tri-mun-bang-anh-sang-xanh-co-hieu-qua-khong.jpg', 75, 1, '2020-11-26 12:18:16'),
(21, 'Điều trị tàn nhang', '1212eww', 1000000, 'https://dayenthaospa.com/wp-content/uploads/2015/11/tri-nam-bang-laser-co-tot-khong-2.jpg', 150, 1, '2020-11-27 12:30:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `status_shop` tinyint(2) DEFAULT 0 COMMENT '0. hien 1. an',
  `created_sh` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `shop`
--

INSERT INTO `shop` (`id`, `title`, `content`, `image`, `address`, `longitude`, `latitude`, `status_shop`, `created_sh`) VALUES
(1, '1212', 'alsdsk', 'a;lsdvjsg', 'ha noi', 22.31212, 105.12321, 1, '2020-10-25 04:24:51'),
(18, '333333', 'alsdsk', 'a;lsdvjsg', 'ha noi', 21.31212, 105.12321, 0, '2020-11-10 13:19:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `single_word`
--

CREATE TABLE `single_word` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `is_types` tinyint(4) DEFAULT NULL COMMENT 'loại đơn , 1 xin nghỉ',
  `begin_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `is_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0. don chưa duyet 1. don da duye',
  `id_User` int(11) DEFAULT NULL,
  `created_single` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `single_word`
--

INSERT INTO `single_word` (`id`, `content`, `is_types`, `begin_date`, `end_date`, `is_status`, `id_User`, `created_single`) VALUES
(1, '444444444444', 1, '2020-11-21 00:00:00', '2020-11-22 00:00:00', 0, 31, '2020-11-20 09:09:42'),
(3, '1212', 1, '2020-11-21 00:00:00', '2020-11-22 02:00:00', 0, 37, '2020-11-20 09:14:39'),
(4, '444444444444', 1, '2020-11-21 00:00:00', '2020-11-22 02:00:00', 0, 32, '2020-12-01 03:36:07'),
(5, '1212', 1, '2020-11-21 00:00:00', '2020-11-22 00:00:00', 0, 33, '2020-12-01 03:37:23'),
(6, '1212', 1, '2020-11-21 03:13:00', '2020-11-23 00:00:00', 0, 34, '2020-12-01 03:37:38'),
(7, '1212', 1, '2020-11-21 00:00:00', '2020-11-23 00:00:00', 0, 35, '2020-12-01 03:37:42'),
(8, '1212', 1, '2020-11-21 00:00:00', '2020-11-23 00:00:00', 0, 36, '2020-12-01 03:37:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fullName` varchar(250) DEFAULT NULL,
  `point` int(11) NOT NULL DEFAULT 0 COMMENT 'điem khuyen mại',
  `id_roles` int(11) DEFAULT NULL COMMENT '1.admin, 2 NV, 3.KH',
  `avatar` varchar(255) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `otp` int(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL COMMENT 'ngay sinh',
  `gender` tinyint(4) DEFAULT NULL COMMENT '0 Nữ , 1 Nam',
  `is_status` tinyint(4) DEFAULT 0 COMMENT '1. nv  làm, 2. nv nghỉ làm',
  `is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0 mở , 1 khoá 2. xoa',
  `id_Shop` int(11) DEFAULT NULL,
  `created_user` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `phone`, `password`, `email`, `fullName`, `point`, `id_roles`, `avatar`, `address`, `otp`, `birthday`, `gender`, `is_status`, `is_active`, `id_Shop`, `created_user`) VALUES
(1, '0987654321', '202cb962ac59075b964b07152d234b70', '0987654321', 'admin', 0, 1, NULL, NULL, NULL, '2020-10-01', NULL, 1, 0, NULL, '2020-10-22 11:07:37'),
(31, '097395978', '202cb962ac59075b964b07152d234b70', 'vinh@gmail.com', 'Vinh', 0, 2, NULL, 'Ha noi', NULL, NULL, NULL, 1, 1, 1, '2020-11-10 10:18:48'),
(32, '0987654322', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 2, NULL, 'Huong Yen', NULL, NULL, NULL, 1, 0, 1, '2020-11-10 10:21:12'),
(33, '0987654323', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 2, NULL, 'Huong Yen', NULL, NULL, NULL, 1, 0, 1, '2020-11-10 10:23:03'),
(34, '0987654324', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 2, NULL, 'Huong Yen', NULL, NULL, NULL, 1, 0, 1, '2020-11-10 10:30:45'),
(35, '0987654326', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-10 10:47:56'),
(36, '0987654327', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-10 10:49:28'),
(37, '0987654328', '202cb962ac59075b964b07152d234b70', NULL, NULL, 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-10 11:05:53'),
(38, '0987654329', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-10 11:07:13'),
(39, '0987654330', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'bbnbbbb', 0, 3, '21qww', NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-10 11:07:44'),
(40, '0987654331', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-10 11:08:47'),
(41, '0987654332', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 1, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-10 11:13:40'),
(42, '0987654337', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 2, 1, '2020-11-10 11:44:38'),
(43, '097395912', '202cb962ac59075b964b07152d234b70', 'vinh@gmail.com', 'Vinh', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-11 07:32:22'),
(44, '0987654333', 'b619154e8d8061bf211581aa447d33c0', 'adc@gmail.com', 'ADC', 0, 1, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-20 14:13:05'),
(45, '0989999999', 'd5c557ff34c10a7c852c77967446f8e1', 'tuvietnails407@gmail.com', 'Nguyễn Ngọc Tú', 0, 2, '', NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-20 14:13:15'),
(46, '0987395971', '964cc7216c4ac999758fbbaf5a3b4b07', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-20 14:13:25'),
(47, '0986666666', '67e4324ddfc6feb37881a452fc30a9bf', 'adc@gmail.com', 'ADC', 0, 1, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-20 15:08:32'),
(48, '0999999999', 'b3ee54a861291e3dea579dbfd5f7c548', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-20 16:30:10'),
(49, '0912345678', '0c936e852d6d430e610963fda7bc1b1e', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-22 02:13:27'),
(50, '0987365987', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:05:08'),
(51, '0987365986', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:24:31'),
(52, '0987365982', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:27:22'),
(53, '0987365980', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:27:48'),
(54, '0987365965', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:30:21'),
(55, '0987365232', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:33:15'),
(56, '0987361111', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:33:29'),
(57, '0987363232', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:36:04'),
(58, '0987365921', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 04:37:10'),
(59, '0987361234', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-22 15:07:33'),
(60, '0987331342', '1bbd886460827015e5d605ed44252251', 'nhinhi122@gmail.com', 'Phạm Băng Nhi', 0, 2, '', NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-23 13:35:30'),
(61, '0981365987', '1bbd886460827015e5d605ed44252251', 'mailan063@gmail.com', 'Kiều Mai Lan', 0, 2, '', NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-23 13:45:27'),
(62, '0287365987', '1bbd886460827015e5d605ed44252251', 'trucquynh0605@gmail.com', 'Võ Trúc Quỳnh', 0, 2, '', NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-23 14:15:27'),
(63, '0968902116', '1bbd886460827015e5d605ed44252251', 'son@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-23 14:48:33'),
(64, '0328962512', '25f9e794323b453885f5181f1b624d0b', 'khanhhx251200@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-24 08:46:50'),
(65, '0987365988', '1bbd886460827015e5d605ed44252251', 'vinhnt0111@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-24 10:08:01'),
(66, '0321316516', '31f09b8ced0abf9de5eccddcb4b5f2f2', 'khanh@amoa.vla', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-25 17:06:00'),
(67, '0130123131', '175e3ac943cfd72e83de3ea4d7dc3acc', 'kh@mao.cm', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-25 17:07:43'),
(68, '0000000000', 'a5f2528e34b3949610b2b3cde387c84c', 'hiennguyen0108@gmail.com', 'Nguyễn thị Hiền', 0, 2, '', NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-26 12:33:03'),
(69, '0122345992', '202cb962ac59075b964b07152d234b70', 'a3333@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 12:00:00'),
(70, '0968954569', '202cb962ac59075b964b07152d234b70', 'maihaanh1211@gmail.com', 'Mai Hà Anh', 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 12:41:08'),
(71, '0969896578', '202cb962ac59075b964b07152d234b70', 'minhhai1108@gmail.com', 'Trần Thị Minh Hải', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 13:42:18'),
(72, '0968789908', '202cb962ac59075b964b07152d234b70', 'mylinhn908@gmail.com', 'Hà Mỹ Linh', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 13:51:42'),
(73, '0966464943', 'e06c93aaff70eb49e5e6a311618b9857', 'hoatieuanh@gmail.com', 'Chu Nguyệt Ánh', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 13:55:20'),
(74, '0964754794', '5369276325e3fc6cb164976c6e0d2d15', 'bichlien502@gmail.com', 'Hà Thị Bích Liên', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 13:58:03'),
(75, '0978522357', '2a1fa2a86ae9d1ff24fa2c149a3931c0', 'hannail221@gmail.com', 'Trịnh Gia Hân', 0, 2, NULL, NULL, NULL, NULL, NULL, 1, 0, 1, '2020-11-27 13:59:53'),
(76, '0968902117', 'f4fc8a416f8be148db91d57412cc34a0', 'abc@gmail.com', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-28 06:11:15'),
(77, '0968930216', 'e24d3a6718be9dd73a94a3277c8ee6fa', 'ajvd@ffd.vn', NULL, 0, 3, NULL, NULL, NULL, NULL, NULL, 1, 0, NULL, '2020-11-30 17:38:38');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `info_config`
--
ALTER TABLE `info_config`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `news_shop`
--
ALTER TABLE `news_shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Shop` (`id_Shop`);

--
-- Chỉ mục cho bảng `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`);

--
-- Chỉ mục cho bảng `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Shop` (`id_Shop`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_promotion` (`id_promotion`);

--
-- Chỉ mục cho bảng `schedule_details`
--
ALTER TABLE `schedule_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_Service_shop` (`id_Service_shop`),
  ADD KEY `id_Schedule` (`id_Schedule`);

--
-- Chỉ mục cho bảng `schedule_historical`
--
ALTER TABLE `schedule_historical`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`),
  ADD KEY `id_schedule` (`id_schedule`);

--
-- Chỉ mục cho bảng `service_shop`
--
ALTER TABLE `service_shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_Shop` (`id_Shop`);

--
-- Chỉ mục cho bảng `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `single_word`
--
ALTER TABLE `single_word`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_User` (`id_User`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `info_config`
--
ALTER TABLE `info_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `news_shop`
--
ALTER TABLE `news_shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT cho bảng `schedule_details`
--
ALTER TABLE `schedule_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=141;

--
-- AUTO_INCREMENT cho bảng `schedule_historical`
--
ALTER TABLE `schedule_historical`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT cho bảng `service_shop`
--
ALTER TABLE `service_shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
