import { Ring } from '@/entities/Ring';
import { httpClient } from '../httpClient';

type RingResponse = Ring;

export const getById = async (ringId: string) => {
  const { data } = await httpClient.get<RingResponse>(`/rings/${ringId}`);

  return data;
};
