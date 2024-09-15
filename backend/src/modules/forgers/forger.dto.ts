import { z } from 'zod';

export const forgerSchema = z
  .object({
    forger_name: z.string({ message: 'You should pass a forger_name string value' }),
    forger_max_forge: z.number({ message: 'You should pass a forger_max_forge number value' })
  })
  .required();

export type createForgerDTO = z.infer<typeof forgerSchema>;
