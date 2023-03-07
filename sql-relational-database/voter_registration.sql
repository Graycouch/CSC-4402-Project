DROP DATABASE IF EXISTS voter_registration; 
CREATE DATABASE voter_registration;
USE voter_registration;

-- Need to add favorites, not sure how to do array
CREATE TABLE voter(
ID VARCHAR(20) NOT NULL,
first_name VARCHAR(20),
last_name VARCHAR(20),
SSN CHAR(11),
DOB CHAR(10),
email VARCHAR(20),
phone_number CHAR(12),
party_ID VARCHAR(20),
district_number VARCHAR(3),
state VARCHAR(10),
PRIMARY KEY (ID)
);

INSERT INTO voter VALUES ('891977906', 'Abdel Rahman', 'Mansour', '123-45-6789', '09/14/2002', 'amans11@lsu.edu', '504-493-1415', 'HEHEHAHA', 1, 'Louisiana');

-- Need to add opinions, not sure how to do array
CREATE TABLE candidate(
ID VARCHAR(20) NOT NULL,
first_name VARCHAR(20),
last_name VARCHAR(20),
SSN CHAR(11),
DOB CHAR(10),
email VARCHAR(20),
phone_number CHAR(12),
party_ID VARCHAR(20),
district_number VARCHAR(3),
state VARCHAR(10),
current_office VARCHAR(50),
next_election_ID VARCHAR(20),
PRIMARY KEY (ID)
);

INSERT INTO candidate VALUES ('123456789', 'Joe', 'Biden', '123-45-6789', '07/12/1900', 'joebiden@gmail.com', '504-493-1415', 'HEHEHAHA', 1, 'Louisiana', 'Office', '123456789');

-- Need to add ballot foreign key
CREATE TABLE election(
ID VARCHAR(20) NOT NULL,
office VARCHAR(50),
date CHAR(10),
PRIMARY KEY (ID)
);

INSERT INTO election VALUES ('123456789', 'Patrick F. Taylor Hall', '05/19/2023');
