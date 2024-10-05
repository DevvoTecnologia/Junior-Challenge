import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_HOST;

if (!baseURL) {
  throw new Error("API base URL is not provided");
}

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
