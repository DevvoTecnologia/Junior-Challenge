'use server';

import { revalidateTag } from 'next/cache';

export async function deleteRing(ringId: number) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await fetch(`http://localhost:3000/rings/${ringId}`, {
      method: 'DELETE',
    });
  } catch (e) {
    console.error(e);
    return { error: 'Failed to delete ring' };
  } finally {
    revalidateTag('rings');
  }
}
