import axios from 'axios';

import { env } from '@/app/config/env';
import { ILoggedUSerData } from '@/types';

const baseUrl = env.apiUrl;

export const login = async (credentials: ILoggedUSerData) => {
  const { data } = await axios.post(`${baseUrl}/login`, credentials);
  return data;
};
