import axios from "axios";

export const baseURL = "http://192.168.100.3:3000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
