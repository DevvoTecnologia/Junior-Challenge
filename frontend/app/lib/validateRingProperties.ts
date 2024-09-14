import type { RawRingData } from './definitions';
import { FormSchema } from './form-schema';

export type possibleFieldStatus =
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'success';
    };

export type validatedFields = {
  [key: string]: possibleFieldStatus;
};

export function validateRingProperties(properties: RawRingData) {
  const result = FormSchema.safeParse(properties);

  if (result.success) {
    return null;
  }

  const REQUIRED_PROPERTIES = ['name', 'power', 'forgedBy', 'image', 'ownerName'];
  const validatedFields: { [key: string]: possibleFieldStatus } = {};
  let successProperties = [...REQUIRED_PROPERTIES];

  result.error.errors.forEach((error) => {
    const key = error.path[0];
    successProperties = successProperties.filter((property) => property !== key);

    validatedFields[key] = {
      status: 'error',
      message: error.message,
    };
  });

  successProperties.forEach((property) => {
    validatedFields[property] = {
      status: 'success',
    };
  });

  return validatedFields;
}
