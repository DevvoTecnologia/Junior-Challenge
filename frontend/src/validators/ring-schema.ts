import { z } from "zod";

export const ringSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	power: z.string().min(1, "O poder é obrigatório"),
	bearer: z.string().min(1, "O portador é obrigatório"),
	forgedBy: z.string().min(1, "O forjador é obrigatório"),
	image: z.string().optional(),
});

export type RingFormData = z.infer<typeof ringSchema>;
