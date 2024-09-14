'use server';

import { revalidateTag } from 'next/cache';
import apiDeleteRing from '../api/deleteRing';
import wait from '../utils/scrips';

export async function deleteRing(ringId: number) {
  await wait(2000);
  const res = await apiDeleteRing(ringId);

  if (res === 'success') {
    revalidateTag('rings');
  }

  return res;
}
