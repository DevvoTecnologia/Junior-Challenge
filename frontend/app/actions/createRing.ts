'use server';

import type { FormState } from '@/app/actions/shared';
import ringDataValidation from '@/app/actions/shared';
import postApiCall from '@/app/api/postRing';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRing(prevState: FormState, formData: FormData): Promise<FormState> {
  const { status, data } = ringDataValidation(formData);

  if (status === 'error') {
    return data;
  }

  const result = await postApiCall(data);

  if (result !== 'success') {
    return result;
  }

  revalidateTag('rings');
  redirect('/');
}
