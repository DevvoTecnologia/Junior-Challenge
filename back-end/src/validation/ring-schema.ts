import { z } from 'zod';

export const ringSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome do anel deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'O nome do anel deve ter no máximo 100 caracteres.' }),
  power: z
    .string()
    .min(1, { message: 'A descrição do poder do anel é obrigatória.' }),
  bearer: z.string().min(1, { message: 'O portador do anel é obrigatório.' }),
  forgedBy: z.enum(['Elfos', 'Anões', 'Homens', 'Sauron'], {
    errorMap: () => ({
      message: 'Forjador inválido. Permitidos: Elfos, Anões, Homens, Sauron.',
    }),
  }),
  image: z.string().url({
    message: 'A URL da imagem do anel é inválida.',
  }),
});
