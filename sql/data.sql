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
    `label` varchar(255),
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

CREATE TABLE `admin`(
	`adminID` int PRIMARY KEY AUTO_INCREMENT,
	FOREIGN KEY (`adminID`) REFERENCES `user`(`userID`)
);

-- DROP TABLE `yolobit`;
CREATE TABLE `yolobit`(
    `yolobitID` int PRIMARY KEY AUTO_INCREMENT
);
-- DROP TABLE `adminManageYolobit`;
CREATE TABLE `adminManageYolobit`(
	`adminID` int PRIMARY KEY,
    `yolobitID` int,
    FOREIGN KEY (`adminID`) REFERENCES `admin`(`adminID`),
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
-- DROP TABLE `yolobitManageDeviceSchedule`;
CREATE TABLE `yolobitManageDeviceSchedule` (
	`dSID` int PRIMARY KEY AUTO_INCREMENT,
    `yolobitID` int,
    FOREIGN KEY (`yolobitID`) REFERENCES `yolobit`(`yolobitID`),
    FOREIGN KEY (`dSID`) REFERENCES `deviceSchedule`(`dSID`)
);


-- insert data
INSERT INTO user VALUES (1, "0123456789", "huy.leanh0709@hcmut.edu.vn", "Le Anh Huy", "Admin", "Viet Nam", "2002-09-07");
INSERT INTO account VALUES ("huyleanh", "012345", 1);
INSERT INTO faceImage VALUES (1000, "Huy Image 1", "https://scontent.fsgn10-2.fna.fbcdn.net/v/t39.30808-6/336268601_742518720862683_8492416973459754325_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=dbeb18&_nc_ohc=dprinoks7LkAX_Hr33K&_nc_ht=scontent.fsgn10-2.fna&oh=00_AfCgRfgdpAojSYNL8tg98ctdJcHmtwNM1QZJqNMt8eGI8Q&oe=641C7433", 1);
INSERT INTO admin VALUES(1);

INSERT INTO user VALUES (2, "0123456789", "hoang.dohuy@hcmut.edu.vn", "Do Huy Hoang", "Staff", "Viet Nam", "2002-09-09");
INSERT INTO account VALUES ("hoangdohuy", "012345", 2);
INSERT INTO employee VALUES(2);





INSERT INTO yolobit VALUES (2000);
INSERT INTO adminManageYolobit VALUES(1, 2000);

INSERT INTO sensor VALUES (3000, "2023-03-17 15:16:59", "Viet Nam", "Humidity", 40, 2000);
INSERT INTO device(name) VALUES ("Water pump");
INSERT INTO device(name) VALUES ("Tarpaulin");
INSERT INTO device(name) VALUES ("Light");

INSERT INTO deviceSchedule VALUES (5000, "15:00:00", "16:00:00", "Monday", 4000);
INSERT INTO yolobitManageDeviceSchedule VALUES(5000, 2000);


-- view data
-- SELECT * from `user` join `account` on `user`.`userID` = `account`.`userID`;
-- select * from `account`;
-- select * from user;
-- select * from faceImage;
-- select * from sensor;
SELECT * FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID;
-- SELECT account.userID, position FROM account join user on account.userID = user.userID where username='huyleanh' and password='012345';

select * from device;
