import { Request, Response } from "express";
import * as ringService from "../services/ringService";

// create a ring
export const createRing = async (req: Request, res: Response) => {
  try {
    const { name, power, holder, forgedBy, image } = req.body;

    if (!name || !power || !holder || !forgedBy || !image) {
      return res
        .status(400)
        .json({ message: "All fields are required to create a ring." });
    }

    const newRing = await ringService.createRing(req.body);

    res.status(201).json(newRing);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// get all rings
export const getRings = async (req: Request, res: Response) => {
  try {
    const rings = await ringService.getRings();

    res.status(200).json(rings);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

// update a ring
export const UpdateRing = async (req: Request, res: Response) => {
  try {
    const { name, power, holder, forgedBy, image } = req.body;

    if (!name || !power || !holder || !forgedBy || !image) {
      return res
        .status(400)
        .json({ message: "All fields are required to update the ring." });
    }

    const updatedRing = await ringService.updateRing(req.params.id, req.body);

    if (!updatedRing) {
      return res.status(404).json({ message: "Ring not found." });
    }

    res.status(200).json(updatedRing);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    }
  }
};

// delete a ring
export const deleteRing = async (req: Request, res: Response) => {
  try {
    const deletedRing = await ringService.deleteRing(req.params.id);

    res.status(200).json(deletedRing);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    }
  }
};
