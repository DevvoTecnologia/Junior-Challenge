import { Ring } from '@/entities/Ring';
import { httpClient } from '../httpClient';

export type UpdateRingParams = Partial<Ring>;

export const update = async ({ id, ...params }: UpdateRingParams) => {
  const { data } = await httpClient.put(`/rings/${id}`, params);

  return data;
};
