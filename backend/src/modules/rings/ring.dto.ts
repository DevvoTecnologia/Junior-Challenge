import { z } from 'zod';

export const ringSchema = z
  .object({
    ring_name: z.string({ message: 'You should pass a ring_name value' }),
    ring_image: z.string({ message: 'You should pass a ring_image value' }),
    ring_power: z.string({ message: 'You should pass a ring_power value' }),
    forger_id: z.number({ message: 'You should pass a forger_id value' }),
    carrier_id: z
      .number({ message: 'You should pass a carrier_id value' })
      .optional()
      .or(z.null()),
  })
  .required();

export type createRingDTO = z.infer<typeof ringSchema>;
