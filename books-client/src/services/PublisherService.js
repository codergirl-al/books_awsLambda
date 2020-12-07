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
  console.log("Erdhi ketu bucii");
  return http.post("/publishers", data);
};

const remove = (id) => {
  return http.delete(`/publishers/${id}`);
};

export default {
  getAll,
  getDropDown,
  get,
  create,
  remove,
};
