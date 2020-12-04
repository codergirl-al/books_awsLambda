import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PublisherDataService from "../services/PublisherService";

const AddPublisher = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const initialPublisherState = {
    id: null,
    name: "",
    location: "",
  };
  const [publisher, setPublisher] = useState(initialPublisherState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPublisher({ ...publisher, [name]: value });
  };

  const savePublisher = () => {
    var data = {
      _id: publisher.id,
      name: publisher.name,
      location: publisher.location,
    };

    PublisherDataService.create(data)
      .then((response) => {
        setPublisher({
          id: response.data.id,
          name: response.data.name,
          location: response.data.location,
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
    savePublisher();
  };

  const newPublisher = () => {
    setPublisher(initialPublisherState);
    setSubmitted(false);
  };
  return (
    <form className="submit-form" onSubmit={handleSubmit(onSubmit)}>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-primary" onClick={newPublisher}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-info">Add Publisher</h1>
          <hr />
          <div className="form-group">
            <label htmlFor="name">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              ref={register({ required: true })}
              value={publisher.name}
              onChange={handleInputChange}
              name="name"
            />
            <span className="text-danger">
              {errors.name && "Name is required"}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Location<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="auth"
              ref={register({ required: true })}
              value={publisher.location}
              onChange={handleInputChange}
              name="location"
            />
            <span className="text-danger">
              {errors.author && "Location is required"}
            </span>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};
export default AddPublisher;
