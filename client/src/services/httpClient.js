import axios from "axios";
import authHeader from "./authHeader";

const httpClient = axios.create({
  baseURL: "https://localhost:3020",
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
