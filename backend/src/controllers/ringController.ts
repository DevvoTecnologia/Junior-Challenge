import { HttpStatusCode } from "../types/types";
import { ZodError } from "zod";
import {
	createRing,
	deleteRing,
	getRings,
	updateRing,
} from "../services/RingService";
import { anelSchema } from "../utils/zod/ring";
import { Request, Response } from "express";

const ringController = {
	createRing: async (req: Request, res: Response) => {
		try {
			const body = await anelSchema.parseAsync(req.body);
			const ring = await createRing(body);

			return res
				.status(HttpStatusCode.ok)
				.json({ data: ring, message: "Anel criado com sucesso!" });
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				const formattedErrors = error.errors.map((err) => ({
					field: err.path.join("."),
					message: err.message,
				}));

				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
					errors: formattedErrors,
				});
			}

			return res
				.status(HttpStatusCode.badRequest)
				.json({ message: "Ocorreu um erro ao criar um anel" });
		}
	},

	// getRings: async (req: Request, res: Response) => {
	// 	try {
	// 		const rings = await getRings();
	// 		return res.status(200).json(rings);
	// 	} catch (error) {
	// 		return res.status(400).json({ error: error.message });
	// 	}
	// },

	// updateRing: async (req: Request, res: Response) => {
	// 	try {
	// 		const { id } = req.params;
	// 		const ring = await updateRing(Number(id), req.body);
	// 		if (!ring) {
	// 			return res.status(404).json({ message: "Ring not found" });
	// 		}
	// 		return res.status(200).json(ring);
	// 	} catch (error) {
	// 		return res.status(400).json({ error: error.message });
	// 	}
	// },

	// deleteRing: async (req: Request, res: Response) => {
	// 	try {
	// 		const { id } = req.params;
	// 		await deleteRing(Number(id));
	// 		return res.status(204).send();
	// 	} catch (error) {
	// 		return res.status(400).json({ error: error.message });
	// 	}
	// },
};

export default ringController;
