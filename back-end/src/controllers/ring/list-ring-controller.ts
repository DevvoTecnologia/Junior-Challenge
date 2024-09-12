import { Request, Response } from 'express';
import { ListRingService } from '../../services/ring/list-ring-service';

export class ListRingController {
  async handle(req: Request, res: Response) {
    try {
      const listRingService = new ListRingService();
      const rings = await listRingService.execute();

      return res.status(200).json(rings);
    } catch {
      return res.status(500).json({
        error: 'Erro ao listar os anéis. Tente novamente mais tarde.',
      });
    }
  }
}
