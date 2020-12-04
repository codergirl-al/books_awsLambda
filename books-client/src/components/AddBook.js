import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BookDataService from "../services/BookService";
import Select from "react-select";

const AddBook = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    rating: "",
    pages: "",
    language: "",
    description: "",
    publisher: "",
    published: false,
  };
  const [book, setBook] = useState(initialBookState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const saveBook = () => {
    var data = {
      title: book.title,
      author: book.author,
      rating: book.rating,
      pages: book.pages,
      language: book.language,
      description: book.description,
      publisher: "",
      published: book.published,
    };

    BookDataService.create(data)
      .then((response) => {
        setBook({
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          rating: response.data.rating,
          pages: response.data.pages,
          language: response.data.language,
          description: response.data.description,
          publisher: response.data.publisher,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSubmit = () => {
    if (formState.errors.data) return;
    saveBook();
  };

  const newBook = () => {
    setBook(initialBookState);
    setSubmitted(false);
  };
  return (
    <form className="submit-form" onSubmit={handleSubmit(onSubmit)}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-primary" onClick={newBook}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-info">Add Book</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="title">
              Title<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              ref={register({ required: true })}
              id="title"
              value={book.title}
              onChange={handleInputChange}
              name="title"
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
              id="auth"
              value={book.author}
              ref={register({ required: true })}
              onChange={handleInputChange}
              name="author"
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
              id="title"
              value={book.rating}
              onChange={handleInputChange}
              name="rating"
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
              id="pages"
              ref={register({ min: 0, required: true })}
              value={book.pages}
              onChange={handleInputChange}
              name="pages"
            />
            <span className="text-danger">
              {errors.pages?.type == "required" && "Pages is required"}
              {errors.pages?.type == "min" &&
                "Please add a positive number for pages."}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <input
              type="text"
              className="form-control"
              id="language"
              value={book.language}
              onChange={handleInputChange}
              name="language"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Add a short description for this book."
              id="description"
              value={book.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div>
            {/* <Select
              value={multiselect}
              onChange={setMultiselect}
              isMulti
              closeMenuOnSelect={false}
              options={branchReducer.options ? branchReducer.options : null}
            /> */}
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};
export default AddBook;
