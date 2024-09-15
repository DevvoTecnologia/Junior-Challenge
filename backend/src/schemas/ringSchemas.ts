import { z } from 'zod';

export const RingCreateSchema = z.object({
  nome: z.string(),
  poder: z.string(),
  portador: z.string(),
  forjadoPor: z.string(),
  imagem: z.string(),
});

export const RingUpdateSchema = z.object({
  nome: z.string().optional(),
  poder: z.string().optional(),
  portador: z.string().optional(),
  forjadoPor: z.string().optional(),
  imagem: z.string().optional(),
});
