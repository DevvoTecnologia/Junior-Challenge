import { BASE_URL } from '@/app/api/shared';
import { ExistingRing } from '@/app/lib/definitions';

export default async function getRings(): Promise<ExistingRing[] | null> {
  try {
    const res = await fetch(`${BASE_URL}/rings`, {
      next: {
        tags: ['rings'],
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch rings');
    }

    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}
