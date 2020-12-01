import React, { useState } from "react";
import BookDataService from "../services/BookService";

const AddBook = () => {
    const initialBookState = {
        id: null,
        title: "",
        author: "",
        description: "",
        rating: "",
        published: false
    };
    const [book, setBook] = useState(initialBookState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setBook({ ...book, [name]: value });
    };

    const saveBook = () => {
        var data = {
            title: book.title,
            description: book.description,
            author: book.author,
            rating: book.rating,
            description: book.description,
        };

        BookDataService.create(data)
            .then(response => {
                setBook({
                    id: response.data.id,
                    title: response.data.title,
                    author: response.data.author,
                    rating: response.data.rating,
                    description: response.data.description,
                    published: response.data.published
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newBook = () => {
        setBook(initialBookState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newBook}>
                        Add
              </button>
                </div>
            ) : (
                    <div>
                        <h1 className="text-center text-info">ADD BOOK</h1>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={book.title}
                                onChange={handleInputChange}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={book.author}
                                onChange={handleInputChange}
                                name="author"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={book.rating}
                                onChange={handleInputChange}
                                name="rating"
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={book.description}
                                onChange={handleInputChange}
                                name="description"
                            />
                        </div>

                        <button onClick={saveBook} className="btn btn-primary">
                            Submit
              </button>
                    </div>
                )}
        </div>
    );
};
export default AddBook;