import axios from "axios";
import { lastfmUrl, TIMEOUT } from "./settings";

const lastfmApi = axios.create({
  baseURL: lastfmUrl,
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

export default lastfmApi; 
