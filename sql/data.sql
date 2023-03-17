DROP  DATABASE `smartfarmdb`;
CREATE DATABASE IF NOT EXISTS `smartfarmdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `smartfarmdb`;

-- --------------------------------------------------------
-- DROP TABLE `user`;
CREATE TABLE `user` (
	`userID` int PRIMARY KEY,
    `phoneNumber` varchar(255),
    `email` varchar(255),
    `name` varchar(255),
    `position` varchar(255),
    `location` varchar(255),
    `DOB` date
);
-- DROP TABLE `faceImage`;
CREATE TABLE `faceImage` (
	`code` varchar(255) PRIMARY KEY,
    `label` varchar(255),
    `linkref` varchar(1000),
     `userID` int,
	FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);
-- DROP TABLE `account`;
CREATE TABLE `account` (
	`username` varchar(255) PRIMARY KEY,
    `password` varchar(255),
    `userID` int,
    FOREIGN KEY (`userID`) REFERENCES `user`(`userID`)
);
-- DROP TABLE `employee`;
CREATE TABLE `employee`(
	`employeeID` int PRIMARY KEY,
	FOREIGN KEY (`employeeID`) REFERENCES `user`(`userID`)
);
-- DROP TABLE `yolobit`;
CREATE TABLE `yolobit`(
    `yolobitID` int PRIMARY KEY
);
-- DROP TABLE `employeeManageYolobit`;
CREATE TABLE `employeeManageYolobit`(
	`employeeID` int PRIMARY KEY,
    `yolobitID` int,
    FOREIGN KEY (`employeeID`) REFERENCES `employee`(`employeeID`),
    FOREIGN KEY (`yolobitID`) REFERENCES `yolobit`(`yolobitID`)
);
-- DROP TABLE `sensor`;
CREATE TABLE `sensor`(
	`sensorID` int PRIMARY KEY,
    `timestamp` datetime,
    `location` varchar(255),
    `type` varchar(255),
    `value` double,
    `yolobitID` int,
	FOREIGN KEY (`yolobitID`) REFERENCES `yolobit`(`yolobitID`)
);
-- DROP TABLE `device`;
CREATE TABLE `device` (
	`dID` int PRIMARY KEY,
    `name` varchar(255)
);
-- DROP TABLE `deviceSchedule`;
CREATE TABLE `deviceSchedule` (
	`dSID` int PRIMARY KEY,
	`startTime` time,
    `endTime` time,
    `dOfW` varchar(255),
    `dID` int,
    FOREIGN KEY (`dID`) REFERENCES `device`(`dID`)
);
-- DROP TABLE `yolobitManageDeviceSchedule`;
CREATE TABLE `yolobitManageDeviceSchedule` (
	`dSID` int PRIMARY KEY,
    `yolobitID` int,
    FOREIGN KEY (`yolobitID`) REFERENCES `yolobit`(`yolobitID`),
    FOREIGN KEY (`dSID`) REFERENCES `deviceSchedule`(`dSID`)
);




-- insert data
INSERT INTO user VALUES (1, "0123456789", "huy.leanh0709@hcmut.edu.vn", "Le Anh Huy", "Staff", "Viet Nam", "2002-09-07");
INSERT INTO account VALUES ("huyleanh", "012345", 1);

INSERT INTO user VALUES (2, "0123456789", "duy.leanh0709@hcmut.edu.vn", "Le Anh Duy", "Staff", "Viet Nam", "2002-07-07");
INSERT INTO account VALUES ("duyleanh", "012345", 2);

INSERT INTO faceImage VALUES (1000, "Huy 1", "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/324263099_1152026902123884_3215507633833538992_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=k8TpX77Y9R0AX8oXcBr&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfAzdQtXhJIJEOWqY70_tiTKzuddYd0GyLcazMQYKI6H8w&oe=64199DC5", 1);
INSERT INTO faceImage VALUES (1001, "Huy 2", "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/307207746_390759193222371_4108161209628341013_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=174925&_nc_ohc=VsI_Ya9eetUAX8G_0PU&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfA07IsopYETc0ZnVzDuqzpsEFzUVM2B4KTVxoQEHl5vvw&oe=64193F74", 1);
INSERT INTO employee VALUES(1);

INSERT INTO yolobit VALUES (2000);
INSERT INTO employeeManageYolobit VALUES(1, 2000);

INSERT INTO sensor VALUES (3000, "2023-03-17 15:16:59", "Viet Nam", "Humidity", 40, 2000);
INSERT INTO device VALUES (4000, "Humidity device");
INSERT INTO deviceSchedule VALUES (5000, "15:00:00", "16:00:00", "Monday", 4000);
INSERT INTO yolobitManageDeviceSchedule VALUES(5000, 2000);



-- view data
-- SELECT * from `user` join `account` on `user`.`userID` = `account`.`userID`;
-- select * from `account`;
-- select * from user;
-- select * from faceImage;
-- select * from sensor;
SELECT * FROM (account join user on account.userID = user.userID) left join faceImage on user.userID = faceImage.userID;


