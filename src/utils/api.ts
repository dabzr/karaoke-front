import axios from "axios";
import { backUrl, TIMEOUT } from "./settings";

const api = axios.create({
  baseURL: backUrl,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default api;
