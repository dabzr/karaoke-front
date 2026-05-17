import axios from "axios";
import { youtubeUrl, TIMEOUT } from "./settings";

const youtubeApi = axios.create({
  baseURL: youtubeUrl,
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

export default youtubeApi; 
