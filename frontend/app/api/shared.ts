import type { APIRingData } from '@/app/lib/definitions';

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const BASE_URL = `https://junior-challenge.onrender.com`;

type parameters = {
  method: 'POST' | 'PUT';
  path: string;
  data: APIRingData;
};

export default async function ringApiCall(params: parameters) {
  const finalURL = BASE_URL + params.path;

  try {
    const res = await fetch(finalURL, {
      method: params.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new APIError(json.message as string);
    }

    return 'success';
  } catch (error) {
    if (error instanceof APIError) {
      return {
        apiValidationError: error.message,
        formValidationErrors: null,
      };
    }

    const action = {
      POST: 'criar',
      PUT: 'atualizar',
    };
    const defaultErrorMessage = `Houve um erro inesperado ao ${
      action[params.method]
    } o anel. Por favor, tente novamente.`;

    console.error(`Error with ${params.method}:`, error);

    return {
      apiValidationError: defaultErrorMessage,
      formValidationErrors: null,
    };
  }
}
