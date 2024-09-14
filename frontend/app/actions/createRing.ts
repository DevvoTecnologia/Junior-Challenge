'use server';

import type { APIRingData } from '@/app/lib/definitions';
import type { validatedFields } from '@/app/lib/validateRingProperties';
import { validateRingProperties } from '@/app/lib/validateRingProperties';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export type FormState =
  | null
  | { apiValidationError: string; formValidationErrors: null }
  | { apiValidationError: null; formValidationErrors: validatedFields };

export async function createRing(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const power = formData.get('power') as string;
  const forgedBy = formData.get('forgedBy') as 'Elfos' | 'Anões' | 'Humanos' | 'Sauron';
  const image = formData.get('image') as string;
  const ownerName = formData.get('owner') as string;

  const formValidationErrors = validateRingProperties({
    name,
    power,
    forgedBy,
    image,
    ownerName,
  });

  if (formValidationErrors) {
    return {
      apiValidationError: null,
      formValidationErrors,
    };
  }

  const properties: APIRingData = {
    ring: {
      name,
      power,
      forgedBy,
      image,
    },
    owner: {
      name: ownerName,
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const res = await fetch('http://localhost:3000/rings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(properties),
    });

    const json = await res.json();

    if (!res.ok) {
      console.log(json);
      return {
        apiValidationError: (json.message as string) || 'Um erro aconteceu ao criar o anel.',
        formValidationErrors: null,
      };
    }
  } catch (e) {
    console.error('Error creating ring:', e);
    return {
      apiValidationError: 'Houve um erro inesperado. Por favor, tente novamente.',
      formValidationErrors: null,
    };
  }

  revalidateTag('rings');
  redirect('/');
}
