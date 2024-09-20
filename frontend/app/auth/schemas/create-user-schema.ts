import { z } from "zod";

const createUserSchema = z
  .object({
    email: z
      .string({ required_error: "Campo obrigatório" })
      .email({ message: "Email inválido" }),
    password: z
      .string({ required_error: "Campo obrigatório" })
      .min(3, { message: "Mínimo de 3 caracteres" }),
    repeatPassword: z
      .string({ required_error: "Campo obrigatório" })
      .min(3, { message: "Mínimo de 3 caracteres" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Senhas não conferem",
    path: ["repeatPassword"],
  });

export default createUserSchema;
export type CreateUser = z.infer<typeof createUserSchema>;
