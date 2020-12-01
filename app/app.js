const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')
const url = 'mongodb://localhost/books'

const app = express()


//Connect to database
mongoose.connect(url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database connected sucessfully !')
},
  error => {
      console.log('Database could not be connected : ' + error)
  }
)

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

const bookRouter = require('./routes/book.routes');
const { books } = require("./models");
app.use(bookRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});