import axios from "axios";

export const baseURL = process.env.API_BASE_HOST;

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
