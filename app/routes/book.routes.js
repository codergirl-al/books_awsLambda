const books = require("../controllers/book.controller.js");
const publishers = require("../controllers/publisher.controller.js");

const express = require("express");
const app = express();

// Create a new Book
app.post("/books", books.create);

// Retrieve all Book
app.get("/books", books.findAll);

// Retrieve a single Book with id
app.get("/books/:id", books.findOne);

// Update a Book with id
app.put("/books/:id", books.update);

// Delete a Book with id
app.delete("/books/:id", books.delete);

// Create a new Book
app.delete("/books/", books.deleteAll);

// publisher routes

app.post("/publishers", publishers.create);

// Retrieve all publishers
app.get("/publishers", publishers.findAll);

app.get("/publishersDropDown", publishers.getDropDown);

// Retrieve a single publisher with id
app.get("/publishers/:id", publishers.findOne);

// Delete a publisher with id
app.delete("/publishers/:id", publishers.delete);

module.exports = app;
