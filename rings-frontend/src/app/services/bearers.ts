import axios from 'axios';

import { baseUrl, config } from './token';

export const setToken = (newToken: string) => {
  config.headers.Authorization = `bearer ${newToken}`;
};

export const getAllBearers = async () => {
  const request = await axios.get(`${baseUrl}/bearers`, config);
  return request.data;
};
