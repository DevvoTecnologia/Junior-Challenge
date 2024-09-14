import { Request, Response } from "express";
import { Ring } from "../models/Ring";

// Limites por categoria
const RING_LIMITS: Record<string, number> = {
  Elfos: 3,
  Anões: 7,
  Homens: 9,
  Sauron: 1,
};

export const createRing = async (req: Request, res: Response) => {
  const { nome, poder, portador, forjadoPor, imagem } = req.body;

  // Verificar o número de anéis já criados por categoria
  const ringCount = await Ring.countDocuments({ forjadoPor });
  const maxRings = RING_LIMITS[forjadoPor];

  if (ringCount >= maxRings) {
    return res.status(400).json({ error: `Limite de ${maxRings} anéis para ${forjadoPor} atingido!` });
  }

  const newRing = new Ring({ nome, poder, portador, forjadoPor, imagem });
  await newRing.save();
  return res.status(201).json(newRing);
};

export const getRings = async (req: Request, res: Response) => {
  const rings = await Ring.find();
  return res.json(rings);
};

export const updateRing = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedRing = await Ring.findByIdAndUpdate(id, req.body, { new: true });
  return res.json(updatedRing);
};

export const deleteRing = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Ring.findByIdAndDelete(id);
  return res.json({ message: "Anel deletado" });
};
