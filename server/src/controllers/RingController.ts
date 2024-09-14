import { Request, Response } from 'express';
import { RingService } from '../services/RingService';
import { IRingRepository } from '../repositories/interfaces/IRingRepository';
import { ForgedBy } from '../entities/Ring';

export class RingController {
  private ringService: RingService;

  constructor(ringRepository: IRingRepository) {
    this.ringService = new RingService(ringRepository);
  }

  public getForgedByOptions(req: Request, res: Response): void {
    const options = this.ringService.getForgedByOptions();
    res.json(options);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, power, owner, forgedBy, image } = req.body;

    if (!Object.values(ForgedBy).includes(forgedBy)) {
      return res.status(400).json({
        error: `Valor inválido para "forgedBy". Valores permitidos: ${Object.values(ForgedBy).join(', ')}`,
      });
    }

    try {
      const ring = await this.ringService.create({
        name,
        power,
        owner,
        forgedBy,
        image,
      });
      return res.status(201).json(ring);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    const rings = await this.ringService.list();
    return res.json(rings);
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const ring = await this.ringService.get(id);
    return res.json(ring);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { forgedBy } = req.body;

    if (forgedBy && !Object.values(ForgedBy).includes(forgedBy)) {
      return res.status(400).json({
        error: `Valor inválido para "forgedBy". Valores permitidos: ${Object.values(ForgedBy).join(', ')}`,
      });
    }

    try {
      const updatedRing = await this.ringService.update(id, req.body);
      return res.json(updatedRing);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.ringService.delete(id);
    return res.status(204).send();
  }
}
