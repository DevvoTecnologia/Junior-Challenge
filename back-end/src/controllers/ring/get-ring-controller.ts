import { Request, Response } from 'express';
import { GetRingService } from '../../services/ring/get-ring-service';

export class GetRingController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const getRingService = new GetRingService();
      const ring = await getRingService.execute({ id });

      return res.status(200).json(ring);
    } catch {
      return res.status(500).json({
        error: 'Anel não encontrado.',
      });
    }
  }
}
