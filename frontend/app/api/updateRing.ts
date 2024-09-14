import type { APIRingData } from '@/app/lib/definitions';
import ringApiCall from './shared';

export default async function updateRing(data: APIRingData, id: string) {
  const res = await ringApiCall({ method: 'PUT', path: `/rings/${id}`, data });
  return res;
}
