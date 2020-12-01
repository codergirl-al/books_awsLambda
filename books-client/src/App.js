import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import About from './components/pages/About';
import AddBook from "./components/AddBook";
import Book from "./components/Book";
import BooksList from "./components/BooksList";


class App extends Component {
  render() {
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
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/about"} className="nav-link">
                About
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/books"]} component={BooksList} />
            <Route exact path="/add" component={AddBook} />
            <Route path="/books/:id" component={Book} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;