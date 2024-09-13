import { httpClient } from '../httpClient';

export const remove = async (ringId: string) => {
  const { data } = await httpClient.delete(`/rings/${ringId}`);

  return data;
};
