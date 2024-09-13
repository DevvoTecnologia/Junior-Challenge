import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'O nome de usuário deve ter mais de 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve possuir mais de 6 caracteres'),
});
