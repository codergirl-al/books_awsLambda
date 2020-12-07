import axios from "axios";

export default axios.create({
  baseURL: "https://8be7vlsh86.execute-api.eu-west-1.amazonaws.com/dev/",
  headers: {
    "Content-type": "application/json",
  },
});

axios.defaults.port = 8080;
