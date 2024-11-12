import { NextFunction, Request, Response } from "express";
import { createRingService, IRingCreate } from "../services/createRing.service";
import { getRingsService } from "../services/getAllRings.service";
import { IRingEdit, updateRingService } from "../services/updateRing.service";
import { deleteRingService } from "../services/deleteRing.service";

export class RingController {
  static async createRing(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IRingCreate = req.body;
      const createdRing = await createRingService(data);
      res
        .status(201)
        .json({ message: "Anel cadastrado com sucesso.", createdRing });
      return;
    } catch (error) {
      return next(error);
    }
  }

  static async getAllRings(req: Request, res: Response, next: NextFunction) {
    try {
      const getRings = await getRingsService();
      res.json(getRings);
      return;
    } catch (error) {
      return next(error);
    }
  }

  static async updateRing(req: Request, res: Response, next: NextFunction) {
    try {
      const data: IRingEdit = req.body;
      const ringId = Number(req.params.id);
      const updatedRing = await updateRingService(ringId, data);
      res
        .status(201)
        .json({ message: "Anel cadastrado com sucesso.", updatedRing });
      return;
    } catch (error) {
      return next(error);
    }
  }

  static async deleteRing(req: Request, res: Response, next: NextFunction) {
    try {
      const ringId = Number(req.params.id);
      await deleteRingService(ringId);
      res.status(204).json({ message: "Anel excluido com sucesso." });
      return;
    } catch (error) {
      return next(error);
    }
  }
}
