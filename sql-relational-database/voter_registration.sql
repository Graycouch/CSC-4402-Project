DROP DATABASE IF EXISTS voter_registration; 
CREATE DATABASE voter_registration;
USE voter_registration;

CREATE TABLE party(
ID VARCHAR(20),
party_name VARCHAR(20),
PRIMARY KEY (ID)
);

INSERT INTO party VALUES (1, 'Republican');
INSERT INTO party VALUES (2, 'Democratic');
INSERT INTO party VALUES (3, 'Libertarian');
INSERT INTO party VALUES (4, 'Green');
INSERT INTO party VALUES (5, 'Forward');
INSERT INTO party VALUES (9, 'Independent');
INSERT INTO party VALUES (99, 'Illuminati');

-- SELECT * FROM party;

CREATE TABLE voter(
ID VARCHAR(20) NOT NULL,
first_name VARCHAR(20),
last_name VARCHAR(20),
SSN CHAR(11),
DOB CHAR(10),
email VARCHAR(30),
phone_number CHAR(12),
party_ID VARCHAR(20),
district_number VARCHAR(3),
state VARCHAR(20),
PRIMARY KEY (ID), 
FOREIGN KEY (party_ID) REFERENCES party(ID)
);

INSERT INTO voter VALUES ('891977906', 'Abdel Rahman', 'Mansour', '123-45-6789', '09/14/2002', 'amans11@lsu.edu', '504-493-1415', 99, 1, 'Louisiana');
INSERT INTO voter VALUES ('12345', 'George', 'Buras', '987-65-4321', '03/13/2000', 'gburas4@lsu.edu', '111-222-3333', 9, 14, 'Louisiana');
INSERT INTO voter VALUES ('087687', 'Peter', 'Parker', '624-65-5342', '06/27/1984', 'pete@gmail.edu', '274-234-5134', 5, 13, 'New York');
INSERT INTO voter VALUES ('2642113', 'Peter', 'Pan', '134-34-6433', '05/14/1984', 'pan@gmail.edu', '34t-24-6344', 3, 5, 'Louisiana');

-- SELECT * FROM voter;

CREATE TABLE candidate(
ID VARCHAR(20) NOT NULL,
first_name VARCHAR(20),
last_name VARCHAR(20),
SSN CHAR(11),
DOB CHAR(10),
email VARCHAR(30),
phone_number CHAR(12),
party_ID VARCHAR(20),
district_number VARCHAR(3),
state VARCHAR(20),
current_job VARCHAR(50),
abortion VARCHAR(250), -- These are opinions
guns VARCHAR(250),
immigration VARCHAR(250),
lgbt VARCHAR(250),
environment VARCHAR(250),
other VARCHAR(250),
PRIMARY KEY (ID), 
FOREIGN KEY (party_ID) REFERENCES party(ID)
);

INSERT INTO candidate VALUES ('999', 'Joe', 'Mama', '123-45-6789', '07/12/1900', 'JM@gmail.com', '504-493-1415', 9, 4, 'Louisiana', 'President', 'wow, abortions!', 'school safety', 'back in summer camp', 'Hello fellow kids', 'save then world with oil', 'can\'t stop me now');
INSERT INTO candidate VALUES ('947', 'Specimen', '#947', '666-69-6666', '01/02/1600', 'human@gmail.com', '667-246-7354', 99, 1, null, null, 'feed me more', 'banned', 'don\'t care', 'don\'t care', 'don\'t care', 'I hunger');
INSERT INTO candidate VALUES ('537', 'Billy', 'Bob', '725-25-7257', '08/02/1993', 'billy@gmail.com', '164-246-7273', 3, 16, 'Louisiana', 'Cook', 'Should be accessible for everyone', 'Should be accessible for everyone', 'Should be accessible for everyone', 'Don\'t care', 'Let the free market take care of it', 'Lower the age of consent');
INSERT INTO candidate VALUES ('635', 'Dan', 'Jackson', '734-14-7489', '09/16/1990', 'dan@gmail.com', '624-265-9476', 1, 16, 'Texas', 'Farmer', 'Do not murder babies', 'I need more guns to feel safe', 'Stay away from me', 'Just not in front of me', 'Black gold never gets old', 'Brought to you by your local billionaire');
INSERT INTO candidate VALUES ('723', 'Ben', 'Jake', '244-16-7342', '09/22/1989', 'ben@gmail.com', '745-345-8576', 2, 12, 'New York', 'Entrepreneur', 'I support it, but I will not protect it', 'Guns are cringe', 'They love me', 'OMG, me!', 'Stop poluting, silly', 'Brought to you by your local billionaire');
INSERT INTO candidate VALUES ('245', 'Ashley', 'Jakobs', '272-25-4854', '12/21/1983', 'Ash@gmail.com', '346-243-2451', 4, 2, 'Louisiana', 'Secretary', null, null, null, null, 'Visit my website for my 100 step plan', 'If the world dies, we die');
INSERT INTO candidate VALUES ('835', 'Brice', 'Samuel', '724-25-2346', '08/30/1983', 'brice@gmail.com', '745-542-7245', 5, 16, 'Louisiana', 'Thinker', 'We should fix the system', 'I have a plan', 'You can count on me', 'Do not worry', 'Let us figure it out together', 'Let us solve the issues');

-- SELECT * FROM candidate;


CREATE TABLE election(
ID VARCHAR(20) NOT NULL,
office VARCHAR(30), -- Office to be won in the election (e.g. President)
election_date CHAR(10),
winner_ID VARCHAR(20), --  ID of the candidate who wins the election
PRIMARY KEY (ID)
);

INSERT INTO election VALUES ('1', 'President', '05/19/2023', null);
INSERT INTO election VALUES ('2', 'Secretary', '05/19/2023', null);
INSERT INTO election VALUES ('3', 'Puppet Master', '05/19/1980', '947');

-- SELECT * FROM election;

CREATE TABLE running_for(
candidate_ID VARCHAR(20),
election_ID VARCHAR(20),
PRIMARY KEY (candidate_ID, election_ID),
FOREIGN KEY (candidate_ID) REFERENCES candidate(ID),
FOREIGN KEY (election_ID) REFERENCES election(ID)
);

INSERT INTO running_for VALUES ('999', '1');
INSERT INTO running_for VALUES ('635', '1');
INSERT INTO running_for VALUES ('245', '1');
INSERT INTO running_for VALUES ('537', '1');
INSERT INTO running_for VALUES ('723', '1');
INSERT INTO running_for VALUES ('999', '2');
INSERT INTO running_for VALUES ('835', '2');

-- SELECT * from running_for;

CREATE TABLE votes_in(
voter_ID VARCHAR(20) NOT NULL,
election_ID VARCHAR(20) NOT NULL,
vote_ID VARCHAR(20), -- ID of the candidate who the voter wants to win the election
PRIMARY KEY (voter_ID, election_ID),
FOREIGN KEY (voter_ID) REFERENCES voter(ID),
FOREIGN KEY (election_ID) REFERENCES election(ID)
);

INSERT INTO votes_in VALUES ('891977906', '1', '999');
INSERT INTO votes_in VALUES ('12345', '1', '723');
INSERT INTO votes_in VALUES ('12345', '2', '835');
INSERT INTO votes_in VALUES ('087687', '2', '835');
INSERT INTO votes_in VALUES ('087687', '1', '999');

-- SELECT * FROM votes_in;

CREATE TABLE favorites(
voter_ID VARCHAR(20) NOT NULL,
candidate_ID VARCHAR(20) NOT NULL, -- ID of the candidate who the voter wishes to add to their favorites list
PRIMARY KEY (voter_ID, candidate_ID),
FOREIGN KEY (voter_ID) REFERENCES voter(ID),
FOREIGN KEY (candidate_ID) REFERENCES candidate(ID)
);

INSERT INTO favorites VALUES ('12345', '723');
INSERT INTO favorites VALUES ('12345', '835');
INSERT INTO favorites VALUES ('12345', '245');
INSERT INTO favorites VALUES ('087687', '999');
INSERT INTO favorites VALUES ('087687', '835');

-- SELECT * FROM favorites;

-- The list of candidates who are running for a particular election
-- SELECT first_name, last_name FROM candidate INNER JOIN running_for ON candidate.ID = running_for.candidate_ID where running_for.election_ID = 1;

-- How many votes each candidate got in an election
-- SELECT candidate.ID, candidate.first_name, candidate.last_name, count(ID) AS '# of Votes'  FROM candidate INNER JOIN votes_in ON candidate.ID = votes_in.vote_ID where votes_in.election_ID = 1 GROUP BY ID;

-- Voter party membership list
-- SELECT voter.ID, first_name, last_name, party_name FROM voter LEFT OUTER JOIN party ON voter.party_ID = party.ID;

-- A voter's favorite candidates
-- SELECT candidate.ID, first_name, last_name FROM candidate INNER JOIN favorites ON candidate.ID = favorites.candidate_ID WHERE voter_ID = '12345';
