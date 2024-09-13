import { Ring } from '@/entities/Ring';
import { httpClient } from '../httpClient';

type CreateRingParams = Omit<Ring, 'id'>;

export const create = async (params: CreateRingParams) => {
  const { data } = await httpClient.post('/rings', params);

  return data;
};
