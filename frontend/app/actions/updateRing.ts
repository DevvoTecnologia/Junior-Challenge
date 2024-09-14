'use server';

import type { FormState } from '@/app/actions/shared';
import ringDataValidation from '@/app/actions/shared';
import updateApiCall from '@/app/api/updateRing';
import wait from '@/app/utils/scrips';
import { revalidateTag } from 'next/cache';

export async function updateRing(
  id: string,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { status, data } = ringDataValidation(formData);

  if (status === 'error') {
    return data;
  }

  await wait(2000);

  const result = await updateApiCall(data, id);

  if (result !== 'success') {
    return result;
  }

  revalidateTag('rings');
  return 'success';
}
