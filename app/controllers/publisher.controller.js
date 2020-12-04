const db = require("../models");
const Publisher = db.publishers;

exports.create = (req, res) => {
  //Validate request
  const publisher = new Publisher({
    _id: req.body.id,
    name: req.body.name,
    founded: req.body.founded,
    location: req.body.location,
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
