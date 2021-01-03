"use strict";
const connectToDatabase = require("./db");
const db = require("./models");
const Book = db.books;
const Publisher = db.publishers;

module.exports.add = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.create(JSON.parse(event.body))
      .then((book) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(book),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the book.",
        })
      );
  });
};

module.exports.updatebook = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true,
    })
      .then((book) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(book),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the books.",
        })
      );
  });
};

module.exports.deletebook = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.findByIdAndRemove(event.pathParameters.id)
      .then((book) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            message: "Removed book with id: " + book._id,
            book: book,
          }),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the books.",
        })
      );
  });
};

module.exports.getbooks = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.find()
      .then((books) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(books),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the books.",
        })
      );
  });
};

module.exports.getbookbyid = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Book.findById(event.pathParameters.id)
      .then((book) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(book),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the books.",
        })
      );
  });
};
