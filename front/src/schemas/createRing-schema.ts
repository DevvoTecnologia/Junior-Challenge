import { z } from 'zod';

export const ringSchema = z.object({
  name: z.string().max(16, 'O nome deve ter menos de 16 caracteres'),
  power: z
    .string()
    .min(1, 'Poder não pode ser vazio')
    .max(1000, 'A descrição do poder deve ter menos de 1000 caracteres'),
  image: z.string().url('URL da imagem inválida'),
});
