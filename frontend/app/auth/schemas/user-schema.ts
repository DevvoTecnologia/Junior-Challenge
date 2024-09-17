import { z } from "zod";

export interface iUser {
  email: string;
  password: string;
}

const userSchema = z.object({
  email: z
    .string({ required_error: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Mínimo de 3 caracteres" }),
});

export default userSchema;
export type User = z.infer<typeof userSchema>;
