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
import type { Ring } from "../models/Ring";
import { checkForgingLimit } from "../utils/utils";

const ringController = {
	createRing: async (req: Request, res: Response) => {
		try {
			const body = await anelSchema.parseAsync(req.body);
			const userId = (req as any).user?.id;

			const countByForgedBy = await getCountByForgedBy(body.forgedBy, userId);

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

			await createRing(body, userId);
			return res.status(HttpStatusCode.created).json({
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

	getRingsByUserId: async (req: Request, res: Response) => {
		try {
			const userId = (req as any).user?.id;

			if (!userId) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const rings = await getRings(userId);

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
			const { ringId } = req.params;
			const userId = (req as any).user?.id;

			if (!ringId) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const ring = await getRingById(ringId);

			if (ring?.user.id !== userId) {
				return res.status(HttpStatusCode.forbidden).json({
					message: "Você não tem permissão para acessar este anel",
				});
			}

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
			const { ringId } = req.params;
			const userId = (req as any).user?.id;

			if (!ringId) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const ring = await getRingById(ringId);

			if (!ring) {
				return res
					.status(HttpStatusCode.notFound)
					.json({ message: "Anel não encontrado" });
			}

			const result = await checkForgingLimit(
				body.forgedBy,
				userId,
				getCountByForgedBy,
			);

			if (result) {
				return res.status(result.statusCode).json({ message: result.message });
			}

			const updatedRing = await updateRing(ringId, body);

			if (!updatedRing) {
				return res
					.status(HttpStatusCode.notFound)
					.json({ message: "O anel não foi encontrado" });
			}

			return res.status(HttpStatusCode.ok).json({
				message: "Anel atualizado com sucesso!",
			});
		} catch (error) {
			console.log(error);
			return res.status(HttpStatusCode.badRequest).json({
				message: "Ocorreu um erro ao editar um anel",
			});
		}
	},

	deleteRing: async (req: Request, res: Response) => {
		try {
			const { ringId } = req.params;

			if (!ringId) {
				return res.status(HttpStatusCode.noContent).json({
					message: "Dados inválidos",
				});
			}

			const deletedRing = await deleteRing(ringId);

			if (deletedRing.affected === 0) {
				return res.status(HttpStatusCode.notFound).send({
					message: "Anel não encontrado",
				});
			}

			return res.status(HttpStatusCode.ok).send({
				message: "Anel deletado com sucesso!",
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
