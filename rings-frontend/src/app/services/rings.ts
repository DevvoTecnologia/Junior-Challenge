import axios from 'axios';

import { baseUrl, config } from './token';

export const setToken = (newToken: string) => {
  config.headers.Authorization = `bearer ${newToken}`;
};

export const getAllRings = async () => {
  const request = await axios.get(`${baseUrl}/rings`, config);
  return request.data;
};

export const createRing = async (newObject: FormData) => {
  const request = await axios.post(`${baseUrl}/rings`, newObject, config);
  return request.data;
};

export const getRingById = async (ringId: string) => {
  const request = await axios.get(`${baseUrl}/rings/${ringId}`, config);
  return request.data;
};

export const updateRing = async (ringId: string, newObject: FormData) => {
  const request = await axios.put(
    `${baseUrl}/rings/${ringId}`,
    newObject,
    config,
  );
  return request.data;
};

export const removeRing = async (ringId: string) => {
  const request = await axios.delete(`${baseUrl}/rings/${ringId}`, config);
  return request.data;
};
