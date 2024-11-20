import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
  },
});

export default api;
