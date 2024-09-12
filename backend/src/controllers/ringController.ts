import { Request, Response } from "express";
import Ring from "../models/Ring";

// create a ring
export const createRing = async (req: Request, res: Response) => {
  try {
    const { name, power, holder, forgedBy, image } = req.body;

    if (!name || !power || !holder || !forgedBy || !image) {
      return res
        .status(400)
        .json({ message: "All fields are required to create a ring." });
    }

    const totalRing = await Ring.countDocuments({ forgedBy });
    const maxRings: { [key: string]: number } = {
      Elves: 3,
      Dwarves: 7,
      Men: 9,
      Sauron: 1,
    };

    if (maxRings[forgedBy] !== undefined && totalRing >= maxRings[forgedBy]) {
      return res.status(400).json({
        message: `Maximum allowed rings forged by ${forgedBy} is ${maxRings[forgedBy]}`,
      });
    }

    const newRing = new Ring({
      name,
      power,
      holder,
      forgedBy,
      image,
    });

    await newRing.save();

    res.status(201).json(newRing);
  } catch (error) {
    res.status(500).json({ error: "Server error while creating the ring." });
  }
};

// get all rings
export const getRings = async (req: Request, res: Response) => {
  try {
    const rings = await Ring.find();

    if (!rings) {
      return res.status(404).json({ message: "No rings found." });
    }

    res.status(200).json(rings);
  } catch (error) {
    res.status(500).json({ error: "Server error while getting the rings." });
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

    const updatedRing = await Ring.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedRing) {
      return res.status(404).json({ message: "Ring not found." });
    }

    res.status(200).json(updatedRing);
  } catch (error) {
    res.status(500).json({ error: "Server error while updating the ring." });
  }
};

// delete a ring
export const deleteRing = async (req: Request, res: Response) => {
  try {
    const deletedRing = await Ring.findByIdAndDelete(req.params.id);

    if (!deletedRing) {
      return res.status(404).json({ message: "Ring not found." });
    }

    res.status(200).json(deletedRing);
  } catch (error) {
    res.status(500).json({ error: "Server error while deleting the ring." });
  }
};
