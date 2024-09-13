import { Ring } from '@/entities/Ring';
import { httpClient } from '../httpClient';

export type RingResponse = Ring[];

export const getAll = async () => {
  const { data } = await httpClient.get<RingResponse>('/rings');

  return data;
};
