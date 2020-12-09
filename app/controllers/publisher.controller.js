const db = require("../models");
const Publisher = db.publishers;
const Book = db.books;

exports.create = (req, res) => {
  //Validate request
  const publisher = new Publisher({
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
    books: Publisher.find().populate("books"),
  });
  publisher
    .save(publisher)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Publisher.",
      });
    });
};
//Retrieve all Publishers from the database

exports.findAll = (req, res) => {
  Publisher.find()
    .then((data) => {
      if (!data) res.status(404).send({ message: "Didn't find any Publisher" });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Publisher with id= " + _id });
    });
};

exports.getDropDown = (req, res) => {
  Publisher.find()
    .then((data) => {
      if (!data) res.status(404).send({ message: "Didn't find any Publisher" });
      else
        res.send(
          data.map((item) => {
            return {
              value: item._id,
              label: item.name,
            };
          })
        );
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Publisher with id= " + _id });
    });
};

exports.getBooksByPublisherId = (req, res) => {
  const publisherId = req.params.id;
  let books;
  Book.find({ publisher: publisherId })
    .then((data) => {
      if (!data) res.status(404).send({ message: "Didn't find any Publisher" });
      else
        res.send(
          data.map((book) => {
            return {
              title: book.title,
            };
          })
        );
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Publisher with id= " + _id });
    });
};

// Find a single Publisher with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Publisher.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Publisher with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Publisher with id=" + id });
    });
};

// Delete a Publisher with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Publisher.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Publisher with id= ${id}. Maybe Publisher was not found!`,
        });
      } else {
        res.send({
          message: "Publisher was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Publisher with id=" + id,
      });
    });
};

exports.findPublisherName = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Publisher.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Publisher with id " + id });
      else {
        res.send(data.name);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Publisher with id=" + id });
    });
};
