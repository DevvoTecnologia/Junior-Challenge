import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(1, "Este campo não pode estar vazio"),
});