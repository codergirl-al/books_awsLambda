import React, { useState, useEffect } from "react";
import BookDataService from "../services/BookService";
import { Link } from "react-router-dom";
import Home from '../components/pages/Home';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBooks();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBooks = () => {
    BookDataService.getAll()
      .then(response => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  };

  const setActiveBook = (book, index) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };

  const removeAllBooks = () => {
    BookDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BookDataService.findByTitle(searchTitle)
      .then(response => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <Home />
      <div className="jumbotron">
        <h2 className="text-info text-center">Add, remove, update books.</h2>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
            </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Books List</h4>

          <ul className="list-group">
            {books &&
              books.map((book, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveBook(book, index)}
                  key={index}
                >
                  {book.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllBooks}
          >
            Remove All
        </button>
        </div>
        <div className="col-md-6">
          {currentBook ? (
            <div>
              <h4>Book</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentBook.title}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentBook.author}
              </div>
              <div>
                <label>
                  <strong>Rating:</strong>
                </label>{" "}
                {currentBook.rating}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBook.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentBook.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/books/" + currentBook.id}
                className="badge badge-warning"
              >
                Edit
            </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a Book...</p>
              </div>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BooksList;