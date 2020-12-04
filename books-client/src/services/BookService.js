import http from "../http-common";

const getAll = () => {
  return http.get("/books/");
};

const get = id => {
  return http.get(`/books/${id}`);
};

const create = data => {
  return http.post("/books/", data);
};

const update = (id, data) => {
  return http.put(`/books/${id}`, data);
};

const remove = id => {
  return http.delete(`/books/${id}`);
};

const removeAll = () => {
  return http.delete(`/books/`);
};

const findByTitle = title => {
  return http.get(`/books/?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};