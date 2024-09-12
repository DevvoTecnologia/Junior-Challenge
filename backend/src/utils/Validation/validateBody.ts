import { ZodSchema } from 'zod';
import { CustomException } from '../CustomException';

export function validateBody(values: unknown, schema: ZodSchema): unknown {
  try {
    const parsedValue = schema.parse(values);
    return parsedValue;
  } catch (error) {
    throw new CustomException({
      errorCode: 'INVALID_DATA',
      errorDescription: error?.issues[0]?.message,
      statusCode: 400,
    });
  }
}
