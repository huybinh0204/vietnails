-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 19, 2020 lúc 03:04 AM
-- Phiên bản máy phục vụ: 10.4.14-MariaDB
-- Phiên bản PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `VietNails_VIP`
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
(1, '3333', '4444', '5555', 1, '2020-11-10 13:56:09'),
(3, '3333', '4444', '5555', 1, '2020-11-11 07:38:18');

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
-- Cấu trúc bảng cho bảng `permission_right`
--

CREATE TABLE `permission_right` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `created_list` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `permission_right`
--

INSERT INTO `permission_right` (`id`, `name`, `title`, `created_list`) VALUES
(1, 'Xoá Shop', 'Xoá Shop', '2020-11-04 02:55:05'),
(2, 'Thêm Shop', 'Thêm Shop', '2020-11-04 02:55:42'),
(3, 'Sửa Shop', 'Sửa Shop', '2020-11-04 02:55:59'),
(4, 'Xem Shop', 'Duyệt Shop', '2020-11-04 03:00:45');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `end_code` varchar(16) DEFAULT NULL COMMENT 'mã code giam giá',
  `title` varchar(255) DEFAULT NULL,
  `number` int(20) DEFAULT NULL COMMENT 'ưu đải theo %',
  `date_favorable` datetime DEFAULT NULL COMMENT ' từ ngày',
  `come_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'đến ngày',
  `created_special` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `promotion`
--

INSERT INTO `promotion` (`id`, `end_code`, `title`, `number`, `date_favorable`, `come_date`, `created_special`) VALUES
(1, NULL, 'mac định', 2, NULL, '0000-00-00 00:00:00', '2020-10-27 10:11:20');

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
-- Cấu trúc bảng cho bảng `roles_permission`
--

CREATE TABLE `roles_permission` (
  `id` int(11) NOT NULL,
  `status_roles` tinyint(2) NOT NULL DEFAULT 0,
  `id_Roles` int(11) DEFAULT NULL,
  `id_permission_right` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `roles_permission`
--

INSERT INTO `roles_permission` (`id`, `status_roles`, `id_Roles`, `id_permission_right`) VALUES
(1, 0, 1, 1),
(2, 0, 1, 2),
(3, 0, 1, 3),
(4, 0, 1, 4),
(5, 0, 2, 4),
(6, 0, 3, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `code_schedule` varchar(16) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL COMMENT 'thời gian làm',
  `end_time` datetime DEFAULT NULL COMMENT 'thời gian kết thúc',
  `moneys` int(11) NOT NULL DEFAULT 0 COMMENT 'tông tiền',
  `minus_point` int(11) NOT NULL DEFAULT 0 COMMENT 'điểm đc trừ',
  `status` tinyint(4) DEFAULT NULL COMMENT '0: kh tạo, 1 nv xac nhan, 2:nv huy',
  `phone_nv` varchar(13) DEFAULT NULL,
  `id_User` int(11) DEFAULT NULL,
  `id_Shop` int(11) DEFAULT NULL,
  `id_promotion` int(11) DEFAULT NULL,
  `content_schedule` varchar(1000) DEFAULT NULL,
  `created_schedule` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `schedule`
--

INSERT INTO `schedule` (`id`, `code_schedule`, `start_time`, `end_time`, `moneys`, `minus_point`, `status`, `phone_nv`, `id_User`, `id_Shop`, `id_promotion`, `content_schedule`, `created_schedule`) VALUES
(70, 'Nt5E8XBnl1', '2020-11-15 19:00:13', '2020-11-15 21:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:17:29'),
(71, 'MhE8zPZ9My', '2020-11-15 19:00:13', '2020-11-15 21:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:36:58'),
(72, '0uZ0e5iM5L', '2020-11-16 19:00:13', '2020-11-16 21:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:44:09'),
(73, 'mYOYVjjVxp', '2020-11-17 19:00:13', '2020-11-17 21:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:44:19'),
(74, 'afICGwIXxD', '2020-11-18 19:00:13', '2020-11-18 21:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:44:27'),
(75, 'OSYQ5ZoAdK', '2020-11-19 19:00:13', '2020-11-19 21:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:44:39'),
(76, 'Y9IojDUdrB', '2020-11-19 08:00:13', '2020-11-19 11:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:46:46'),
(77, '7EX8x1M22N', '2020-11-19 19:00:13', '2020-11-19 20:30:13', 500000, 10, 0, NULL, 31, 1, 1, '1111', '2020-11-18 16:48:09');

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
(128, '20:00', '09876532555', 43, 9, 77);

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
(1, 'title', 'content', 0, 'image', 10, 1, '2020-10-25 04:24:24'),
(8, 'asdas', '1212eww', 0, '12121', 30, 1, '2020-11-10 13:16:20'),
(9, 'asdas', '1212eww', 0, '12121', 30, 1, '2020-11-10 13:23:02');

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
  `is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0 mở , 1 khoá 2. xoa',
  `id_Shop` int(11) DEFAULT NULL,
  `created_user` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `phone`, `password`, `email`, `fullName`, `point`, `id_roles`, `avatar`, `address`, `otp`, `birthday`, `gender`, `is_active`, `id_Shop`, `created_user`) VALUES
(1, '0987654321', '202cb962ac59075b964b07152d234b70', '0987654321', 'admin', 0, 1, NULL, NULL, NULL, '2020-10-01', NULL, 0, NULL, '2020-10-22 11:07:37'),
(31, '097395978', '123', 'vinh@gmail.com', 'Vinh', 0, 2, NULL, 'Ha noi', NULL, NULL, NULL, 1, 1, '2020-11-10 10:18:48'),
(32, '0987654322', '123', 'adc@gmail.com', 'ADC', 0, 2, NULL, 'Huong Yen', NULL, NULL, NULL, 0, 1, '2020-11-10 10:21:12'),
(33, '0987654323', '123', 'adc@gmail.com', 'ADC', 0, 3, NULL, 'Huong Yen', NULL, NULL, NULL, 0, 1, '2020-11-10 10:23:03'),
(34, '0987654324', '123', 'adc@gmail.com', 'ADC', 0, 3, NULL, 'Huong Yen', NULL, NULL, NULL, 0, 1, '2020-11-10 10:30:45'),
(35, '0987654326', '123', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 1, '2020-11-10 10:47:56'),
(36, '0987654327', '123', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 1, '2020-11-10 10:49:28'),
(37, '0987654328', '123', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, '2020-11-10 11:05:53'),
(38, '0987654329', '123', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 1, '2020-11-10 11:07:13'),
(39, '0987654330', '225e8a3fe20e95f6cd9b9e10bfe5eb69', 'adc@gmail.com', 'bbnbbbb', 0, 3, '21qww', NULL, NULL, NULL, NULL, 0, 1, '2020-11-10 11:07:44'),
(40, '0987654331', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 1, '2020-11-10 11:08:47'),
(41, '0987654332', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 1, NULL, NULL, NULL, NULL, NULL, 0, 1, '2020-11-10 11:13:40'),
(42, '0987654337', '202cb962ac59075b964b07152d234b70', 'adc@gmail.com', 'ADC', 0, 3, NULL, NULL, NULL, NULL, NULL, 2, 1, '2020-11-10 11:44:38'),
(43, '097395912', '202cb962ac59075b964b07152d234b70', 'vinh@gmail.com', 'Vinh', 0, 3, NULL, NULL, NULL, NULL, NULL, 0, 1, '2020-11-11 07:32:22');

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
-- Chỉ mục cho bảng `permission_right`
--
ALTER TABLE `permission_right`
  ADD PRIMARY KEY (`id`);

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
-- Chỉ mục cho bảng `roles_permission`
--
ALTER TABLE `roles_permission`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_permission_right` (`id_permission_right`),
  ADD KEY `id_Roles` (`id_Roles`);

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
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD KEY `id_Shop` (`id_Shop`),
  ADD KEY `id_roles` (`id_roles`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `permission_right`
--
ALTER TABLE `permission_right`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `roles_permission`
--
ALTER TABLE `roles_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT cho bảng `schedule_details`
--
ALTER TABLE `schedule_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT cho bảng `service_shop`
--
ALTER TABLE `service_shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `news_shop`
--
ALTER TABLE `news_shop`
  ADD CONSTRAINT `news_shop_ibfk_1` FOREIGN KEY (`id_Shop`) REFERENCES `shop` (`id`);

--
-- Các ràng buộc cho bảng `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `roles_permission`
--
ALTER TABLE `roles_permission`
  ADD CONSTRAINT `roles_permission_ibfk_1` FOREIGN KEY (`id_permission_right`) REFERENCES `permission_right` (`id`),
  ADD CONSTRAINT `roles_permission_ibfk_2` FOREIGN KEY (`id_Roles`) REFERENCES `roles` (`id`);

--
-- Các ràng buộc cho bảng `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`id_Shop`) REFERENCES `shop` (`id`),
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`id_User`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`id_promotion`) REFERENCES `promotion` (`id`);

--
-- Các ràng buộc cho bảng `schedule_details`
--
ALTER TABLE `schedule_details`
  ADD CONSTRAINT `schedule_details_ibfk_1` FOREIGN KEY (`id_User`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `schedule_details_ibfk_2` FOREIGN KEY (`id_Service_shop`) REFERENCES `service_shop` (`id`),
  ADD CONSTRAINT `schedule_details_ibfk_3` FOREIGN KEY (`id_Schedule`) REFERENCES `schedule` (`id`);

--
-- Các ràng buộc cho bảng `service_shop`
--
ALTER TABLE `service_shop`
  ADD CONSTRAINT `service_shop_ibfk_1` FOREIGN KEY (`id_Shop`) REFERENCES `shop` (`id`);

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_Shop`) REFERENCES `shop` (`id`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`id_roles`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
