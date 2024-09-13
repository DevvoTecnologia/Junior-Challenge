import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  images: z.instanceof(FileList).optional(),
});
