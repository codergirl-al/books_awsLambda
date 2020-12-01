const db = require("../models");
const Book = db.books;

// Create and Save a new Book
exports.create = (req, res) => {
  console.log("hello world");
    // Validate request
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Book object
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      rating: req.body.rating,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Save Book in the database
    book
      .save(book)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Book."
        });
      });
  };

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  
    Book.find()
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found any book"});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Book with id=" + id });
      });
  };

// Find a single Book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Book.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Book with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Book with id=" + id });
      });
  };

// Update a Book by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Book with id=${id}. Maybe Book was not found!`
          });
        } else res.send({ message: "Book was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Book with id=" + id
        });
      });
  };

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Book.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
          });
        } else {
          res.send({
            message: "Book was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Book with id=" + id
        });
      });
  };

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
     Book.remove({})
      .then(data => {
        res.send({
          message: `${data.deletedCount}  Books were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all books."
        });
      });
  };

// Find all published Books
exports.findAllPublished = (req, res) => {
    Book.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving books."
        });
      });
  };