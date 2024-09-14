import { Request, Response } from "express";
import ringService from "../services/ring-service";
import * as Yup from "yup";

const RingSchema = Yup.object().shape({
  name: Yup.string().required(),
  power: Yup.string().required(),
  bearer: Yup.string().required(),
  forgedBy: Yup.string().required(),
  imageUrl: Yup.string().required(),
});

const handleLimitExceededError = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes("Ring limit for")) {
      res.status(400).json({ message: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Ring manage failed", error: error.message });
    }
  } else {
    res
      .status(500)
      .json({ message: "Ring manage failed", error: "Unknown error" });
  }
};

const createRing = async (req: Request, res: Response) => {
  if (!(await RingSchema.isValid(req.body))) {
    return res.status(400).json({ error: "Validation fails" });
  }

  try {
    const ring = await ringService.createRing(req.body);
    res.status(201).json(ring);
  } catch (error) {
    handleLimitExceededError(res, error);
  }
};

const listRings = async (req: Request, res: Response) => {
  try {
    const rings = await ringService.listRings();
    const transformedRings = rings.map((ring) => ({
      id: ring._id,
      name: ring.name,
      power: ring.power,
      bearer: ring.bearer,
      forgedBy: ring.forgedBy,
      imageUrl: ring.imageUrl,
    }));

    res.json(transformedRings);
  } catch (error) {
    res.status(500).json({ message: "Error listing rings", error });
  }
};

const updateRing = async (req: Request, res: Response) => {
  if (!(await RingSchema.isValid(req.body))) {
    return res.status(400).json({ error: "Validation fails" });
  }

  const { id } = req.params;
  try {
    const updatedRing = await ringService.updateRing(id, req.body);
    if (!updatedRing) {
      return res.status(404).json({ message: "Ring not found" });
    }
    res.json(updatedRing);
  } catch (error) {
    handleLimitExceededError(res, error);
  }
};

const deleteRing = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRing = await ringService.deleteRing(id);
    if (!deletedRing) {
      return res.status(404).json({ message: "Ring not found" });
    }
    res.json({ message: "Ring successfully removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing the ring", error });
  }
};

export default {
  createRing,
  listRings,
  updateRing,
  deleteRing,
};
