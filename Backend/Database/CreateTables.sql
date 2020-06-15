-- Create Tables
DROP TABLE IF EXISTS Debts;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    CONSTRAINT userPk PRIMARY KEY(username)
);

CREATE TABLE Debts (
    debtID int IDENTITY(1,1) PRIMARY KEY,
    owing varchar(255) NOT NULL,
    owed varchar(255) NOT NULL,
    amount money CHECK (amount >= 0) NOT NULL,
    description varchar(255) NOT NULL,
    CONSTRAINT owingFK FOREIGN KEY(owing) REFERENCES Users(username),
    CONSTRAINT owedFK FOREIGN KEY(owed) REFERENCES Users(username),
    CHECK (owing != owed)
);