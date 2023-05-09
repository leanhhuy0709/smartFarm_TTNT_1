DROP DATABASE IF EXISTS`smartfarmdb`;
CREATE DATABASE IF NOT EXISTS `smartfarmdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `smartfarmdb`;

-- --------------------------------------------------------
-- DROP TABLE `user`;
CREATE TABLE `user` (
	`userID` int PRIMARY KEY AUTO_INCREMENT,
    `phoneNumber` varchar(255),
    `email` varchar(255),
    `name` varchar(255),
    `position` varchar(255),
    `location` varchar(255),
    `DOB` date
    
);
-- DROP TABLE `faceImage`;
CREATE TABLE `faceImage` (
	`code` int PRIMARY KEY AUTO_INCREMENT,
--     `label` varchar(255),
    `linkref` varchar(1000),
    `userID` int,
	FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);
-- DROP TABLE `account`;
CREATE TABLE `account` (
	`username` varchar(255) PRIMARY KEY,
    `password` varchar(255),
    `userID` int AUTO_INCREMENT,
    FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);
-- DROP TABLE `employee`;
CREATE TABLE `employee`(
	`employeeID` int PRIMARY KEY AUTO_INCREMENT,
	FOREIGN KEY (`employeeID`) REFERENCES `user`(`userID`)
);

CREATE TABLE `owner`(
	`ownerID` int PRIMARY KEY AUTO_INCREMENT,
	FOREIGN KEY (`ownerID`) REFERENCES `user`(`userID`)
);
CREATE TABLE `access_history`(
	`datetime` DATETIME PRIMARY KEY
);
CREATE TABLE `enter_farm`(
	`userid` INT,
    `datetime` DATETIME PRIMARY KEY,
    
    FOREIGN KEY (`datetime`) REFERENCES `access_history`(`datetime`),
    FOREIGN KEY (`userid`) REFERENCES `user`(`userid`)
);
-- DROP TABLE `yolobit`;
CREATE TABLE `yolobit`(
    `yolobitID` int PRIMARY KEY AUTO_INCREMENT
);
-- DROP TABLE `ownerManageYolobit`;
CREATE TABLE `ownerManageYolobit`(
	`ownerID` int PRIMARY KEY,
    `yolobitID` int,
    FOREIGN KEY (`ownerID`) REFERENCES `owner`(`ownerID`),
    FOREIGN KEY (`yolobitID`) REFERENCES `yolobit`(`yolobitID`)
);
-- DROP TABLE `sensor`;
CREATE TABLE `sensor`(
	`sensorID` int PRIMARY KEY AUTO_INCREMENT,
    `timestamp` datetime,
    `location` varchar(255),
    `type` varchar(255),
    `value` double,
    `yolobitID` int,
	FOREIGN KEY (`yolobitID`) REFERENCES `yolobit`(`yolobitID`)
);
CREATE TABLE `message`(
	`id` int PRIMARY KEY AUTO_INCREMENT,
    `type` varchar(100),
    `datetime` DATETIME,
    `value` INT
);
-- DROP TABLE `device`;
CREATE TABLE `device` (
	`dID` int PRIMARY KEY AUTO_INCREMENT,
    `name` varchar(255)
);
-- DROP TABLE `deviceSchedule`;
CREATE TABLE `deviceSchedule` (
	`dSID` int PRIMARY KEY AUTO_INCREMENT,
	`startTime` time,
    `endTime` time,
    `dOfW` varchar(255),
    `dID` int,
    FOREIGN KEY (`dID`) REFERENCES `device`(`dID`)
);

CREATE TABLE `data` (
	`dataID` int PRIMARY KEY AUTO_INCREMENT,
    `value` int,
    `time` datetime,
    `type` varchar(255)
);-- do something

select * from `deviceSchedule`;

-- insert data
INSERT INTO `user` VALUES (1, "0123456789", "huy.leanh0709@hcmut.edu.vn", "Le Anh Huy", "Owner", "Viet Nam", "2002-09-07");
INSERT INTO `account` VALUES ("huyleanh", "012345", 1);
INSERT INTO `faceImage` VALUES (1000, "images/anhhuy.jpg", 1);
INSERT INTO owner VALUES(1);

INSERT INTO `user` VALUES (2, "0123456789", "hoang.dohuy@hcmut.edu.vn", "Do Huy Hoang", "Staff", "Viet Nam", "2002-09-09");
INSERT INTO `account` VALUES ("hoangdohuy", "012345", 2);
INSERT INTO `employee` VALUES(2);





INSERT INTO `yolobit` VALUES (2000);
INSERT INTO `ownerManageYolobit` VALUES(1, 2000);

INSERT INTO `sensor` VALUES (3000, "2023-03-17 15:16:59", "Viet Nam", "Humidity", 40, 2000);
INSERT INTO `device`(`name`) VALUES ("Water pump");
INSERT INTO `device`(`name`) VALUES ("Tarpaulin");
INSERT INTO `device`(`name`) VALUES ("Light");

INSERT INTO `deviceSchedule`(`startTime`,`endTime`,`dOfW`,`dID`) VALUES ("15:00:00", "16:00:00", "Monday", 1);



-- view data
-- SELECT * from `user` join `account` on `user`.`userID` = `account`.`userID`;
-- select * from `account`;
-- select * from user;
-- select * from faceImage;
-- select * from sensor;
-- SELECT * FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID;
-- -- SELECT account.userID, position FROM account join user on account.userID = user.userID where username='huyleanh' and password='012345';

-- select * from user;
-- -- SELECT * FROM deviceSchedule join device on deviceSchedule.dID = device.dID;
-- SELECT user.userID, email, name, position, location, DOB, linkref, phoneNumber FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID;


-- select * from device;

-- select * from deviceSchedule;
-- SELECT * FROM `faceImage`;
-- SELECT `user`.`userID` FROM `user`, `faceImage` WHERE `user`.`userID` = `faceImage`.`userID`;
