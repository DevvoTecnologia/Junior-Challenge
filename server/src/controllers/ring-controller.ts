import type { Request, Response } from "express";
import * as ringService from "../services/ring-service";

export const createRing = async (req: Request, res: Response) => {
	try {
		const ring = await ringService.createRing(req.body);
		res.status(201).json(ring);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		} else {
			res.status(500).json({ message: "Erro interno do servidor" });
		}
	}
};

export const getRings = async (_req: Request, res: Response) => {
	try {
		const rings = await ringService.getRings();
		res.json(rings);
	} catch (error) {
		res.status(500).json({ message: "Erro ao buscar os anéis" });
	}
};

export const updateRing = async (req: Request, res: Response) => {
	try {
		const updatedRing = await ringService.updateRing(req.params.id, req.body);
		if (updatedRing) {
			res.json(updatedRing);
		} else {
			res.status(404).json({ message: "Anel não encontrado" });
		}
	} catch (error) {
		res.status(500).json({ message: "Erro ao atualizar o anel" });
	}
};

export const deleteRing = async (req: Request, res: Response) => {
	try {
		const deleted = await ringService.deleteRing(req.params.id);
		if (deleted) {
			res.status(204).send();
		} else {
			res.status(404).json({ message: "Anel não encontrado" });
		}
	} catch (error) {
		res.status(500).json({ message: "Erro ao deletar o anel" });
	}
};
