"use strict";
const connectToDatabase = require("./db");
const db = require("./models");
const Publisher = db.publishers;
const Book = db.books;

module.exports.addpublisher = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Publisher.create(JSON.parse(event.body))
      .then((publisher) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(publisher),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not create the publisher.",
        })
      );
  });
};

module.exports.getpublishers = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Publisher.find()
      .then((publishers) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(publishers),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the publishers.",
        })
      );
  });
};

module.exports.getpublisherbyid = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Publisher.findById(event.pathParameters.id)
      .then((publisher) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(publisher),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the publisher.",
        })
      );
  });
};

module.exports.getbooksbypublisherid = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const publisherId = event.pathParameters.id;
  connectToDatabase().then(() => {
    Book.find({ publisher: publisherId })
      .then((data) => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(
            data.map((book) => {
              return {
                title: book.title,
              };
            })
          ),
        });
      })
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the publisher's books.",
        })
      );
  });
};

module.exports.getdropdown = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    Publisher.find().then((publisher) => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(
          publisher.map((item) => {
            return {
              value: item._id,
              label: item.name,
            };
          })
        ),
      });
    });
  });
};

module.exports.getpublishername = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase().then(() => {
    const id = event.pathParameters.id;
    Publisher.findById(id)
      .then((publisher) =>
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(publisher.name),
        })
      )
      .catch((err) =>
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: { "Content-Type": "text/plain" },
          body: "Could not fetch the books's publisher.",
        })
      );
  });
};
