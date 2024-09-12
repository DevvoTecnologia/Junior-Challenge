import { env } from '@/constants/env';
import { localStorageKeys } from '@/constants/localStorageKeys';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: env.API_URL,
});

httpClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
