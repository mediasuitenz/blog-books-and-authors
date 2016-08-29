# Books and Authors

This project is a simple Loopback 2.x installation that demonstrates being able to write SQL statements to populate
 models, rather than the Loopback query language.  This is necessary for writing complex queries, or using
 stored procedures.

It has two basic models:
 * book
 * author

An author can have many books, but a book only has one author.

All the action happens in the `server/models/book.js` file.
