import { BASE_URL } from './shared';

export default async function deleteRing(ringId: number) {
  const finalUrl = `${BASE_URL}/rings/${ringId}`;

  try {
    await fetch(finalUrl, {
      method: 'DELETE',
    });
    return 'success';
  } catch (e) {
    console.error(e);
    return 'error';
  }
}
