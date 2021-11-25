DROP DATABASE IF EXISTS k-audio ;

CREATE DATABASE k-audio;

USE k-audio;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  firstName varchar(20) NOT NULL,
  lastName varchar(20) NOT NULL,
  email varchar(20) NOT NULL,
  guest int NOT NULL,
  PRIMARY KEY (id)
);
