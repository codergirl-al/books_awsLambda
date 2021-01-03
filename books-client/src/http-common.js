import axios from "axios";
import { Auth } from "aws-amplify";

axios.defaults.port = 8080;

const instance = axios.create({
  // baseURL: "https://x1sv16kkt0.execute-api.eu-west-1.amazonaws.com/dev/",
  baseURL: "http://localhost:3000/dev",
});

instance.interceptors.request.use(async function (config) {
  const session = await Auth.currentSession();
  let idToken = session.getIdToken();

  let jwt = idToken.getJwtToken();

  config.headers.Authorization = jwt;

  return config;
});
export default instance;
