import type { APIRingData, RawRingData } from '@/app/lib/definitions';
import type { validatedFields } from '@/app/lib/validateRingProperties';
import { validateRingProperties } from '@/app/lib/validateRingProperties';

export type FormState =
  | null
  | { apiValidationError: string; formValidationErrors: null }
  | { apiValidationError: null; formValidationErrors: validatedFields }
  | 'success';

export type PossibleReturn =
  | {
      status: 'error';
      data: FormState;
    }
  | {
      status: 'success';
      data: APIRingData;
    };

function groupFormData(formData: FormData): RawRingData {
  const name = formData.get('name') as string;
  const power = formData.get('power') as string;
  const forgedBy = formData.get('forgedBy') as 'Elfos' | 'Anões' | 'Humanos' | 'Sauron';
  const image = formData.get('image') as string;
  const ownerName = formData.get('owner') as string;

  return {
    name,
    power,
    forgedBy,
    image,
    ownerName,
  };
}

function validate(rawData: RawRingData): PossibleReturn {
  const formValidationErrors = validateRingProperties(rawData);

  if (formValidationErrors) {
    return {
      status: 'error',
      data: {
        apiValidationError: null,
        formValidationErrors,
      },
    };
  }

  const { ownerName, ...ringData } = rawData;
  const reqReadyData: APIRingData = {
    ring: {
      ...ringData,
    },
    owner: {
      name: ownerName,
    },
  };

  return {
    status: 'success',
    data: reqReadyData,
  };
}

export default function ringDataValidation(formData: FormData) {
  const data = groupFormData(formData);
  return validate(data);
}
