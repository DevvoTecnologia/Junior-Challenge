import { Request, Response } from "express";

import { Forger } from "../@types";
import { RingCreateInputParameters } from "../repositories/ring/types-ring-repository";
import { RingServices } from "../services/ring-services";

export class RingController {
  constructor(private readonly ringService = new RingServices()) {}

  async executeCreate(req: Request, res: Response): Promise<void> {
    const { name, power, carrier, forgedBy } =
      req.body as RingCreateInputParameters;
    const image = `/files/${req.file?.filename}`;
    const token = req.headers.authorization?.split(" ")[1] || "";

    try {
      const newRing = await this.ringService.createRing(token, {
        name,
        power,
        carrier,
        forgedBy: forgedBy.toUpperCase() as Forger,
        image,
      });

      res.status(201).json({ newRing });
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  }

  async executeFindAll(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1] || "";
    try {
      const rings = await this.ringService.findAll(token);
      res.status(200).json(rings);
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  }

  async executeFindOne(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { id } = req.params as { id: string };

    try {
      const ring = await this.ringService.findOne(id, token);

      res.status(200).json(ring);
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      res.status(500).json({ error: _error.message });
    }
  }

  public async executeUpdate(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const token = req.headers.authorization?.split(" ")[1] || "";
    const { name, power, forgedBy, carrier } =
      req.body as RingCreateInputParameters;
    const image = `/files/${req.file?.filename}`;

    try {
      const updatedRing = await this.ringService.updateRing(id, token, {
        name,
        power,
        forgedBy: forgedBy.toUpperCase() as Forger,
        carrier,
        image,
      });

      res.status(200).json(updatedRing);
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      res.status(404).json({ error: _error.message });
    }
  }

  async executeDelete(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const token = req.headers.authorization?.split(" ")[1] || "";

    try {
      await this.ringService.deleteRing(id, token);

      res.status(200).json({ message: "Anel excluído com sucesso." });
    } catch (error) {
      console.error(error);
      const _error = error as Error;
      res.status(404).json({ error: _error.message });
    }
  }
}
