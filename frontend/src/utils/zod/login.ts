import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Este campo é obrigatório")
		.email("Formato de email inválido"),
	password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type Login = z.infer<typeof loginSchema>;
