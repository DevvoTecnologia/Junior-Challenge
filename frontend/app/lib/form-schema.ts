import { z } from 'zod';

export const FormSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome do anel é obrigatório')
    .max(255, 'O nome do anel não pode ter mais de 255 caracteres'),
  power: z.string().min(1, 'O poder do anel é obrigatório'),
  forgedBy: z.enum(['Elfos', 'Anões', 'Humanos', 'Sauron'], {
    errorMap: () => ({
      message:
        'O forjador do anel deve ser uma das seguintes opções: Elfos, Anões, Humanos ou Sauron',
    }),
  }),
  image: z
    .string()
    .min(1, 'A URL da imagem é obrigatória')
    .max(255, 'A URL da imagem não pode ter mais de 255 caracteres')
    .url('A URL da imagem deve ser válida'),
  ownerName: z
    .string()
    .min(1, 'O nome do proprietário é obrigatório')
    .max(255, 'O nome do proprietário não pode ter mais de 255 caracteres'),
});
