import { ZodSchema } from 'zod';
import { validateBody } from './validateBody';
import { validateQuery } from './validateQuery';

interface GateDictionary {
  [key: string]: (values: unknown, schema?: ZodSchema) => unknown;
}

/**
 * Dictionary for map all the params
 *
 * @type {GateDictionary}
 */
export const validateGate: GateDictionary = {
  /**
   * To handle with query params
   */
  query: (values) => validateQuery(values),
  /**
   * To handle with body params
   */
  body: (values, schema) => validateBody(values, schema),
  /**
   * To handle with route params
   */
  param: (values) => values,
  /**
   * To handle with custom params
   */
  custom: (values) => values,
};
