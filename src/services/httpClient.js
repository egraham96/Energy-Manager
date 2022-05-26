import axios from "axios";
import authHeader from "./authHeader";

const httpClient = axios.create({
  baseURL: "https://fozoglu-reengen-capstone-app.herokuapp.com/",
  headers: {
    Accept: "application/json",
  },
});

const requestHandler = (request) => {
  request.headers["x-access-token"] = authHeader();
  return request;
};

httpClient.interceptors.request.use((request) => requestHandler(request));

export default httpClient;
