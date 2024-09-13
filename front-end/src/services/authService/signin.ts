import { httpClient } from '../httpClient';

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
}

export const signin = async (params: SigninParams) => {
  const { data } = await httpClient.post<SigninResponse>('/auth', params);

  return data;
};
