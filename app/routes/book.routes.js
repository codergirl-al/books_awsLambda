const books = require("../controllers/book.controller.js");
const express = require('express')
const app = express()

// Create a new Book
app.post("/", books.create);

// Retrieve all Book
app.get("/", books.findAll);

// Retrieve all published Book
app.get("/published", books.findAllPublished);

// Retrieve a single Book with id
app.get("/:id", books.findOne);

// Update a Book with id
app.put("/:id", books.update);

// Delete a Book with id
app.delete("/:id", books.delete);

// Create a new Book
app.delete("/", books.deleteAll);

module.exports = app;
