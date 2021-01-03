import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddBook from "../components/AddBook";
import Book from "../components/Book";
import BooksList from "../components/BooksList";
import AddPublisher from "../components/AddPublisher";
import PublishersList from "../components/PublishersList";

const Books = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/books" className="navbar-brand">
          BooksLIB
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Library
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/publishersList"} className="nav-link">
              Publishers
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Book
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addpublisher"} className="nav-link">
              Add Publisher
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/books"]} component={BooksList} />
          <Route path="/publishersList" component={PublishersList} />
          <Route exact path="/add" component={AddBook} />
          <Route exact path="/addpublisher" component={AddPublisher} />
          <Route path="/books/:id" component={Book} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default Books;
