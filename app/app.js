const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const url =
  "mongodb+srv://booksDBUser:123dbuserpass321@books.vadfw.mongodb.net/<books>?retryWrites=true&w=majority";

const app = express();
//Connect to database
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connected sucessfully !");
    },
    (error) => {
      console.log("Database could not be connected : " + error);
    }
  );
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const booksRouter = require("./routes/book.routes");
const { books } = require("./models");
app.use(booksRouter);

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
const handler = serverless(app);

module.exports.app = async (event, context) => {
  return await handler(event, context);
};
