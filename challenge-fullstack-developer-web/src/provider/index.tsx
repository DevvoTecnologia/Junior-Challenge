import axios from 'axios';

const MAIN_URL_API = process.env.REACT_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: MAIN_URL_API
});