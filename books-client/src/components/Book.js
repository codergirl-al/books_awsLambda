import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BookDataService from "../services/BookService";

const Book = (props) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    rating: "",
    pages: "",
    language: "",
    description: "",
    publisher_id: "",
    published: false,
  };
  const [currentBook, setCurrentBook] = useState(initialBookState);
  const [message, setMessage] = useState("");

  const getBook = (id) => {
    BookDataService.get(id)
      .then((response) => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBook(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentBook({ ...currentBook, [name]: value });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentBook.id,
      title: currentBook.title,
      author: currentBook.author,
      rating: currentBook.rating,
      pages: currentBook.pages,
      language: currentBook.language,
      description: currentBook.description,
      publisher_id: currentBook.publisher_id,
      published: status,
    };

    BookDataService.update(currentBook.id, data)
      .then((response) => {
        setCurrentBook({ ...currentBook, published: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateBook = () => {
    BookDataService.update(currentBook.id, currentBook)
      .then((response) => {
        console.log(response.data);
        setMessage("The book was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBook = () => {
    BookDataService.remove(currentBook.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/books");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmit = () => {
    if (formState.errors.data) return;
    updateBook();
  };

  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Book</h4>
          <form className="submit-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="title">
                Title<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                ref={register({ required: true })}
                id="title"
                name="title"
                value={currentBook.title}
                onChange={handleInputChange}
              />
              <span className="text-danger">
                {errors.title && "Title is required"}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="author">
                Author<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                ref={register({ required: true })}
                id="author"
                name="author"
                value={currentBook.author}
                onChange={handleInputChange}
              />
              <span className="text-danger">
                {errors.author && "Author is required"}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                className="form-control"
                ref={register({ min: 0, max: 5 })}
                id="rating"
                name="rating"
                value={currentBook.rating}
                onChange={handleInputChange}
              />
              <span className="text-danger">
                {errors.rating &&
                  "Invalid number for rating. Add a number between 0 and 5."}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="pages">
                Pages<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                ref={register({ min: 0, required: true })}
                id="pages"
                name="pages"
                value={currentBook.pages}
                onChange={handleInputChange}
              />
              <span className="text-danger">
                {errors.pages?.type == "required" && "Pages is required"}
                {errors.pages?.type == "min" &&
                  "Please add a positive number for pages."}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="language">language</label>
              <input
                type="text"
                className="form-control"
                id="language"
                name="language"
                value={currentBook.language}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBook.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="publisher_id">Publisher:</label>
              <input
                type="text"
                className="form-control"
                id="publisher_id"
                name="publisher_id"
                value={currentBook.publisher_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.published ? "Published" : "Pending"}
            </div>
            {currentBook.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button className="badge badge-danger mr-2" onClick={deleteBook}>
              Delete
            </button>

            <button type="submit" className="badge badge-success">
              Update
            </button>
            <p>{message}</p>
          </form>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Book...</p>
        </div>
      )}
    </div>
  );
};

export default Book;
