import type { APIRingData } from '@/app/lib/definitions';
import ringApiCall from './shared';

export default async function postRing(data: APIRingData) {
  const res = await ringApiCall({ method: 'POST', path: '/rings', data });
  return res;
}
