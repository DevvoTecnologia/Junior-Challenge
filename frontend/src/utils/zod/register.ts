import { z } from "zod";

export const registerSchema = z
	.object({
		email: z
			.string()
			.min(1, "Este campo é obrigatório")
			.email("Formato de email inválido"),
		password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
		confirmPassword: z.string().min(1, "Este campo é obrigatório"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não conferem",
		path: ["confirmPassword"],
	});

export type Register = z.infer<typeof registerSchema>;
