'use server';

import { revalidateTag } from 'next/cache';
import apiDeleteRing from '../api/deleteRing';

export async function deleteRing(ringId: number) {
  const res = await apiDeleteRing(ringId);

  if (res === 'success') {
    revalidateTag('rings');
  }

  return res;
}
