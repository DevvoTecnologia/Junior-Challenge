import axios from "axios";

export const baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
