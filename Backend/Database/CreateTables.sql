-- Create Tables
DROP TABLE IF EXISTS Expenses;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    CONSTRAINT userPk PRIMARY KEY(username)
);

CREATE TABLE Expenses (
    debtID int IDENTITY(1,1) PRIMARY KEY,
    description varchar(255) NOT NULL,
    amount money CHECK (amount >= 0) NOT NULL,
    username varchar(255) NOT NULL,
    dateAdded varchar(255) NOT NULL,
    CONSTRAINT userFK FOREIGN KEY(username) REFERENCES Users(username)
);

CREATE TABLE Paid (
    payID int IDENTITY(1,1) PRIMARY KEY,
    debtID int NOT NULL,
    description varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    datePayed varchar(255) NOT NULL,
    amountPaid money CHECK (amount >= 0) NOT NULL,
    CONSTRAINT userFK FOREIGN KEY(username) REFERENCES Users(username),
    CONSTRAINT debtFK FOREIGN KEY(debtID) REFERENCES Expenses(debtID)
);