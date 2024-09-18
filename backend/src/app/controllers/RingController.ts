import { Request, Response } from 'express';
import { RingService } from '../services/RingService';

export class RingController {
  private ringService: RingService;

  constructor() {
    this.ringService = new RingService();
  }

  public async listRings(req: Request, res: Response): Promise<Response> {
    try {
      const rings = await this.ringService.listRings();

      return res.json(rings);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: 'Erro ao listar anéis', error });
    }
  }

  public async getRing(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const rings = await this.ringService.getRing(id);

      return res.json(rings);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: 'Erro ao listar anel', error });
    }
  }

  public async createRings(req: Request, res: Response): Promise<Response> {
    try {
      const newRing = req.body;
      const insertedRing = await this.ringService.createRing(newRing);
      return res.json(insertedRing);
    } catch (error) {
      console.error(error);

      return res.status(500).json({ error });
    }
  }

  public async updateRing(req: Request, res: Response): Promise<Response> {
    try {
      const ringId = req.params.id;
      const updates = req.body;
      console.log(ringId);
      console.log(updates);

      const updatedRing = await this.ringService.updateRing(ringId, updates);

      return res.json(updatedRing);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar', error });
    }
  }

  public async deleteRing(req: Request, res: Response): Promise<Response> {
    try {
      const ringId = req.params.id;
      await this.ringService.deleteRing(ringId);

      return res.json({ message: 'Deletado com sucesso!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao deletar', error });
    }
  }
}
