import { z } from 'zod';

export const carrierSchema = z
  .object({
    carrier_name: z.string({ message: 'You should pass a carrier_name string value' }),
  })
  .required();

export type createCarrierDTO = z.infer<typeof carrierSchema>;
