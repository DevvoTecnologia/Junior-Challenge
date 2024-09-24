import { Request, Response } from "express";
import RingService from "../services/RingService";

class RingController {
  async create(req: Request, res: Response) {
    try {
      const ring = await RingService.create(req.body);
      return res.status(201).json(ring);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(400).json({ error: "Ocorreu um erro desconhecido." });
      }
    }
  }

  async getAll(req: Request, res: Response) {
    const rings = await RingService.getAll();
    return res.json(rings);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const rings = await RingService.findById(id);
    return res.json(rings);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await RingService.update(id, req.body);
      return res.status(204).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(400).json({ error: "Ocorreu um erro desconhecido." });
      }
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await RingService.delete(id);
    return res.status(204).send();
  }
}

export default new RingController();
