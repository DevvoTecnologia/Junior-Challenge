import { z } from "zod";

export const anelSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	power: z.string().min(1, "O poder do anel é obrigatório"),
	bearer: z.string().min(1, "O nome do portador é obrigatório"),
	forgedBy: z.string().min(1, "O forjador do anel é obrigatório"),
	image: z.string().min(1, "A imagem é obrigatória"),
});

export type Anel = z.infer<typeof anelSchema>;
