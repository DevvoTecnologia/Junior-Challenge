import { Request, Response } from 'express';
import { RingService } from '../services/RingService';

const ringService = new RingService();

export class RingController {
  async create(req: Request, res: Response) {
    try {
      const ring = await ringService.createRing(req.body);
      res.status(201).json(ring);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async getAll(req: Request, res: Response) {
    const rings = await ringService.getAllRings();
    res.status(200).json(rings);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedRing = await ringService.updateRing(Number(id), req.body);
      res.status(200).json(updatedRing);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await ringService.deleteRing(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }
}