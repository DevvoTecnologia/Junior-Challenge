import { z } from 'zod';

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres.')
    .max(100, 'O nome deve ter no máximo 100 caracteres.'),
  email: z.string().email('O email fornecido é inválido.'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(50, 'A senha deve ter no máximo 50 caracteres.'),
});

export const signInSchema = z.object({
  email: z.string().email('O email fornecido é inválido.'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(50, 'A senha deve ter no máximo 50 caracteres.'),
});
