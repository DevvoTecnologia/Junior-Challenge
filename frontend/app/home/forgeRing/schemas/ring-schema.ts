import { z } from "zod";

export interface iRing {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem?: string;
}

const ringSchema = z.object({
  forjadoPor: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, { message: "Campo obrigatório" }),
  nome: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Mínimo de 3 caracteres" }),
  poder: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Mínimo de 3 caracteres" }),
  portador: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Mínimo de 3 caracteres" }),
  imagem: z.string().optional(),
});

export default ringSchema;
export type CreateRing = z.infer<typeof ringSchema>;
