import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

if (!apiUrl) {
  throw new Error('REACT_APP_API_URL is not defined');
}

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
