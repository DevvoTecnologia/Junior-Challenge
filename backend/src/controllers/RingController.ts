import { Request, Response } from 'express';
import RingService from '../services/RingService';

class RingController {
  static async create(req: Request, res: Response) {
    try {
      console.log("req body", req.body);
      
      const ring = await RingService.create(req.body);
      res.status(201).json(ring);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const rings = await RingService.getAll();
    res.json(rings);
  }

  static async update(req: Request, res: Response) {
    try {
      const ring = await RingService.update(Number(req.params.id), req.body);
      res.json(ring);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      await RingService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const ring = await RingService.getById(id);
      res.json(ring);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}

export default RingController;
