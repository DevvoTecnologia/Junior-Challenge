import { env } from '@/app/config/env';

export const config = {
  headers: {
    Authorization: '',
  },
};

export const baseUrl = env.apiUrl;

export const setToken = (newToken: string) => {
  config.headers.Authorization = `bearer ${newToken}`;
};
