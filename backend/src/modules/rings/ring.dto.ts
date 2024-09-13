import { z } from 'zod';

export const ringSchema = z
  .object({
    ring_name: z.string({ message: 'You should pass a ring_name string value' }),
    ring_image: z.string({ message: 'You should pass a ring_image string value' }),
    ring_power: z.string({ message: 'You should pass a ring_power string value' }),
    forger_id: z.number({ message: 'You should pass a forger_id number value' }),
    carrier_id: z
      .number({ message: 'You should pass a carrier_id number value' })
      .optional()
      .or(z.null()),
  })
  .required();

export type createRingDTO = z.infer<typeof ringSchema>;
