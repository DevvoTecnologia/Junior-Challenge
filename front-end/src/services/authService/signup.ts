import { httpClient } from '../httpClient';

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignUpResponse {
  accessToken: string;
}

export const signup = async (params: SignUpParams) => {
  const { data } = await httpClient.post<SignUpResponse>('/users', params);

  return data;
};
