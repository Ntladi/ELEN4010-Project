# Database for storing information

Date: 2020-06-132

## Status

Accepted

## Context

The name, password and expenses of the household members are stored in the database so that the app 
can retrieve this information when it is required. 

## Decision

The Azure Sql Database was used for persistance and the information is organised into 3 tables. The first table, called `Users` stores user information in a table that designates the unique username as a primary key that can be referenced by other tables. The second table `Expenses` stores every expense posted by every user and it uses an iterrable id to uniquely identify each expense. Furthermore, each expense is also marked with a secondary key that references back to the `User` table in order identify which user posted it. Lastly, a `Debts` table keeps track of all the settled debts with keys that refer users and expenses back to their respective tables.

## Consequences

 * Referencing other tables using keys reduces the overall number of columns per table.
 * Standardised, making it easier to understand and make queries to perform actions. 
 * Easy to set up database and start using it.
 * Tables could be joined to find information about users or itineraries which existed in other tables.
 * An internet connection is required to access the tables. This may slow app performance if connection is poor.
 * A joint table could not be created which gave users a list of expenses posted expenses and settled expenses at the same time. However, this was resolved by making nested sql queries.