import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import BookDataService from "../services/BookService";
import PublisherDataService from "../services/PublisherService";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const AddBook = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const [options, setOptions] = useState([]);
  const history = useHistory();
  useEffect(() => {
    getOptions();
  }, []);

  const initialBookState = {
    id: null,
    title: "",
    author: "",
    rating: "",
    pages: "",
    language: "",
    description: "",
    //   publisher: { options },
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
      publisher: options.value,
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
        history.push("/books");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSubmit = (data, e) => {
    if (formState.errors.data) return;
    saveBook();
  };

  const getOptions = () => {
    PublisherDataService.getDropDown()
      .then((response) => {
        setOptions(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form className="submit-form" onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="publisher">Publisher</label>
          <Select
            onChange={setOptions}
            options={options}
            onChange={setOptions}
          />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};
export default AddBook;
