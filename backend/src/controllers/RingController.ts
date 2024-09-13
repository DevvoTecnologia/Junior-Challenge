import { NextFunction, Request, Response } from 'express';
import { RingService } from '../services/RingService';

export class RingController {
  constructor(private ringService: RingService) {}

  createRing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ring: ringData, owner: ownerData } = req.body;
      const newRing = await this.ringService.createRingWithOwner(ringData, ownerData);
      res.status(201).json(newRing);
    } catch (error) {
      next(error);
    }
  };

  getAllRings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rings = await this.ringService.getAllRings();
      res.status(200).json(rings);
    } catch (error) {
      next(error);
    }
  };

  updateRing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ringId } = req.params;
      const ringData = req.body;
      const updatedRing = await this.ringService.updateRing(Number(ringId), ringData);
      res.status(200).json(updatedRing);
    } catch (error) {
      next(error);
    }
  };

  deleteRing = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ringId } = req.params;
      await this.ringService.deleteRing(Number(ringId));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
