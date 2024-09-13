import { HttpStatusCode } from "../types/types";
import { ZodError } from "zod";
import {
	createRing,
	deleteRing,
	getCountByForgedBy,
	getRingById,
	getRings,
	updateRing,
} from "../services/RingService";
import { anelSchema } from "../utils/zod/ring";
import type { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

const ringController = {
	createRing: async (req: Request, res: Response) => {
		try {
			const body = await anelSchema.parseAsync(req.body);
			const countByForgedBy = await getCountByForgedBy(body.forgedBy);

			const limits = {
				Elfos: 3,
				Anões: 7,
				Homens: 9,
				Sauron: 1,
			};

			const limit = limits[body.forgedBy as keyof typeof limits];
			if (limit !== undefined && countByForgedBy >= limit) {
				return res.status(HttpStatusCode.conflict).json({
					message: `${body.forgedBy} podem forjar no máximo ${limit} ${limit > 1 ? "anéis" : "anel"}`,
				});
			}

			const ring = await createRing(body);
			return res.status(HttpStatusCode.created).json({
				data: ring,
				message: "Anel criado com sucesso!",
			});
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

			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao criar um anel",
			});
		}
	},

	getRings: async (req: Request, res: Response) => {
		try {
			const rings = await getRings();

			return res
				.status(HttpStatusCode.ok)
				.json({ data: rings, message: "Anéis encontrados" });
		} catch (error) {
			console.log(error);
			return res
				.status(HttpStatusCode.badRequest)
				.json({ message: "Ocorreu um erro ao listar os anéis" });
		}
	},

	getRingById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const ring = await getRingById(id);

			if (!ring) {
				return res
					.status(HttpStatusCode.notFound)
					.json({ message: "Anel não encontrado" });
			}

			return res
				.status(HttpStatusCode.ok)
				.json({ data: ring, message: "Anel encontrado" });
		} catch (error) {
			console.log(error);
			return res
				.status(HttpStatusCode.badRequest)
				.json({ message: "Anel não encontrado" });
		}
	},

	updateRing: async (req: Request, res: Response) => {
		try {
			const body = await anelSchema.parseAsync(req.body);

			const { id } = req.params;

			if (!id) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const countByForgedBy = await getCountByForgedBy(body.forgedBy);

			const limits = {
				Elfos: 3,
				Anões: 7,
				Homens: 9,
				Sauron: 1,
			};

			const limit = limits[body.forgedBy as keyof typeof limits];
			if (limit !== undefined && countByForgedBy >= limit) {
				return res.status(HttpStatusCode.conflict).json({
					message: `${body.forgedBy} podem forjar no máximo ${limit} ${limit > 1 ? "anéis" : "anel"}`,
				});
			}

			const updatedRing = await updateRing(id, body);

			if (!updatedRing) {
				return res
					.status(HttpStatusCode.notFound)
					.json({ message: "O anel não foi encontrado" });
			}

			return res.status(HttpStatusCode.ok).json({
				data: updatedRing,
				message: "Anel atualizado com sucesso!",
			});
		} catch (error) {
			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao editar um anel",
			});
		}
	},

	deleteRing: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			if (!id) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const deletedRing = await deleteRing(id);

			if (deletedRing.affected === 0) {
				return res.status(HttpStatusCode.notFound).send({
					message: "Anel não encontrado",
				});
			}

			const rings = await getRings();

			return res.status(HttpStatusCode.ok).send({
				message: "Anel deletado com sucesso!",
				data: rings,
			});
		} catch (error) {
			console.log(error);

			if (error instanceof QueryFailedError) {
				return res.status(HttpStatusCode.badRequest).json({
					message: "ID do anel fornecido é inválido.",
				});
			}

			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao excluir um anel",
			});
		}
	},
};

export default ringController;
