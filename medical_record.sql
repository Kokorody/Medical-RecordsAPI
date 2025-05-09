-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2025 at 11:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medical_record`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `id_doctor` int(11) NOT NULL,
  `name_doctor` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `licence` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`id_doctor`, `name_doctor`, `specialization`, `licence`) VALUES
(1, 'Dr. Roro Sulastri', 'Penyakit Dalam', 'SIP-001-JW'),
(2, 'Dr. Jatmiko Wardhana', 'Anak', 'SIP-002-JW'),
(3, 'Dr. Tumenggung Prawiro', 'Umum', 'SIP-003-JW'),
(4, 'Dr. Raden Tumenggung Santosa', 'Saraf', 'SIP-004-JW'),
(5, 'dev', 'dev', 'jawa'),
(6, 'dev2', 'dev2', 'jawaaa'),
(7, 'dev3', 'dev3', 'javva');

-- --------------------------------------------------------

--
-- Table structure for table `medrec`
--

CREATE TABLE `medrec` (
  `id_medrec` int(11) NOT NULL,
  `code_medrec` varchar(255) DEFAULT NULL,
  `id_patient` int(11) DEFAULT NULL,
  `id_doctor` int(11) DEFAULT NULL,
  `diagnose` varchar(255) DEFAULT NULL,
  `treatment` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medrec`
--

INSERT INTO `medrec` (`id_medrec`, `code_medrec`, `id_patient`, `id_doctor`, `diagnose`, `treatment`, `notes`, `created_at`) VALUES
(1, 'MR001', 1, 1, 'Hipertensi', 'Obat tekanan darah', 'Kontrol tiap 2 minggu', '2025-05-01 10:00:00'),
(2, 'MR002', 2, 2, 'Demam Berdarah', 'Rawat inap & cairan infus', 'Pantau trombosit harian', '2025-05-01 14:30:00'),
(3, 'MR003', 3, 3, 'Batuk Kronis', 'Obat batuk & antibiotik', 'Rujuk ke paru jika tidak membaik', '2025-05-02 09:00:00'),
(4, 'MR004', 1, 3, 'Asam Lambung', 'Antasida dan diet sehat', 'Pantangan pedas dan kopi', NULL),
(6, 'DEVM001', 1, 3, 'dev1', 'dev2', 'dev3', '2025-05-07 15:38:38');

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id_patient` int(11) NOT NULL,
  `code_patient` varchar(255) DEFAULT NULL,
  `name_patient` varchar(255) DEFAULT NULL,
  `dob_patient` date DEFAULT NULL,
  `gender_patient` varchar(255) DEFAULT NULL,
  `phone_patient` varchar(255) DEFAULT NULL,
  `address_patient` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id_patient`, `code_patient`, `name_patient`, `dob_patient`, `gender_patient`, `phone_patient`, `address_patient`) VALUES
(1, 'P001', 'Raden Mas Broto', '1985-03-10', 'Laki-laki', '081234567890', 'Dusun Sumberjati, Bantul'),
(2, 'P002', 'Nyai Sekar Ayu', '1992-07-21', 'Perempuan', '082198765432', 'Desa Candirejo, Sleman'),
(3, 'P003', 'Ki Bagus Wiryo', '1970-11-15', 'Laki-laki', '081345678901', 'Kampung Mertani, Kulon Progo'),
(4, 'P004', 'Raden Ayu Sasmita', '1995-08-12', 'Perempuan', '082345678900', 'Dusun Ngabean, Magelang'),
(5, 'P005', 'Ki Rangga Saputra', '1968-02-05', 'Laki-Laki', '\'083234567890', 'Dusun Kalikuning, Gunung Kidul'),
(7, 'DEV_P002', 'DEV Raden Roro Ki Rangga Saputra', '1968-02-04', 'Laki-Laki', '\'083234567890', 'DEV Dusmil Dusun Kalikuning, Gunung Kidul'),
(9, 'DEV_P001', 'DEV Ki Rangga Saputra', '1968-02-04', 'Laki-Laki', '\'083234567890', 'DEV Dusun Kalikuning, Gunung Kidul'),
(10, 'DEV_P002', 'DEV Raden Den Den Den Den', '1968-02-04', 'Laki-Laki', '\'083234567890', 'DEV_IS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`id_doctor`);

--
-- Indexes for table `medrec`
--
ALTER TABLE `medrec`
  ADD PRIMARY KEY (`id_medrec`),
  ADD KEY `id_patient` (`id_patient`),
  ADD KEY `id_doctor` (`id_doctor`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id_patient`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `id_doctor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medrec`
--
ALTER TABLE `medrec`
  MODIFY `id_medrec` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id_patient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medrec`
--
ALTER TABLE `medrec`
  ADD CONSTRAINT `medrec_ibfk_1` FOREIGN KEY (`id_patient`) REFERENCES `patient` (`id_patient`),
  ADD CONSTRAINT `medrec_ibfk_2` FOREIGN KEY (`id_doctor`) REFERENCES `doctor` (`id_doctor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
