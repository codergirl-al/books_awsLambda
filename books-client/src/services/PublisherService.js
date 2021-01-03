import http from "../http-common";

const getAll = () => {
  return http.get("/publishers");
};

const getDropDown = () => {
  return http.get("/publishersDropDown");
};

const get = (id) => {
  return http.get(`/publishers/${id}`);
};

const create = (data) => {
  return http.post("/publishers", data);
};

const findPublisherName = (id) => {
  return http.get(`/books/publishers/${id}`);
};

const getBooksByPublisherId = (id) => {
  return http.get(`/publishers/books/${id}`);
};

export default {
  getAll,
  getDropDown,
  get,
  create,
  findPublisherName,
  getBooksByPublisherId,
};
