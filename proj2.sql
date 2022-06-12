-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2022 at 01:26 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proj2`
--

-- --------------------------------------------------------

--
-- Table structure for table `cats`
--

CREATE TABLE `cats` (
  `catID` int(11) NOT NULL,
  `name` varchar(255) COLLATE latin1_general_ci NOT NULL,
  `breed` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `age` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `photo_path` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `breeder` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `entrants`
--

CREATE TABLE `entrants` (
  `email` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `showID` int(11) DEFAULT NULL,
  `catID` int(11) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `entrantID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `logID` int(11) NOT NULL,
  `IP` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `sessionID` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `userType` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `action` varchar(100) COLLATE latin1_general_ci DEFAULT NULL,
  `URL` varchar(100) COLLATE latin1_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`logID`, `IP`, `sessionID`, `email`, `userType`, `timestamp`, `action`, `URL`) VALUES
(102, '::1', 'K0Ha8ivRp_ht07k3kjJgLptYpWqlLbnn', NULL, NULL, '2022-03-24 22:25:58', 'GET', '/api/shows');

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `showID` int(11) NOT NULL,
  `title` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `location` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `judges` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `date` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `council` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `ticket_price` int(11) DEFAULT NULL,
  `ticket_count` int(11) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `password` varchar(100) COLLATE latin1_general_ci NOT NULL,
  `name` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE latin1_general_ci DEFAULT NULL,
  `userType` varchar(100) COLLATE latin1_general_ci DEFAULT 'user',
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `password`, `name`, `phone`, `userType`, `timestamp`) VALUES
('dallas@mail.com', '$2b$06$2V4NTZnI3dULo3WIhIH9u.6feDIkPMzwXFTbAWsY5cNB4mTjOLJFO', 'dallas', '4646546545465', 'user', '2022-03-24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`catID`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `entrants`
--
ALTER TABLE `entrants`
  ADD PRIMARY KEY (`entrantID`),
  ADD KEY `catID` (`catID`),
  ADD KEY `showID` (`showID`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`logID`),
  ADD KEY `user_email` (`email`);

--
-- Indexes for table `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`showID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cats`
--
ALTER TABLE `cats`
  MODIFY `catID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `entrants`
--
ALTER TABLE `entrants`
  MODIFY `entrantID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `showID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cats`
--
ALTER TABLE `cats`
  ADD CONSTRAINT `cats_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Constraints for table `entrants`
--
ALTER TABLE `entrants`
  ADD CONSTRAINT `entrants_ibfk_1` FOREIGN KEY (`catID`) REFERENCES `cats` (`catID`),
  ADD CONSTRAINT `entrants_ibfk_2` FOREIGN KEY (`showID`) REFERENCES `shows` (`showID`),
  ADD CONSTRAINT `entrants_ibfk_3` FOREIGN KEY (`email`) REFERENCES `users` (`email`);

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
