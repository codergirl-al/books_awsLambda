import http from "../http-common";
import axios from "axios";
import { Auth } from "aws-amplify";

const getAll = async () => {
  // return http.get("/books/");
  const session = await Auth.currentSession();
  const userData = await axios.get(
    "https://x1sv16kkt0.execute-api.eu-west-1.amazonaws.com/dev/books",
    {
      headers: {
        Authorization: session.getIdToken().getJwtToken(),
        "Content-Type": "application/json",
      },
    }
  );
  return userData;
};

const get = (id) => {
  return http.get(`/books/${id}`);
};

const create = (data) => {
  return http.post("/books/", data);
};

const update = (id, data) => {
  return http.put(`/books/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/books/${id}`);
};

const removeAll = () => {
  return http.delete(`/books/`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};
