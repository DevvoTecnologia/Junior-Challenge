import { Request, Response } from 'express';
import { RemoveRingService } from '../../services/ring/remove-ring-service';

export class RemoveRingController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const removeRingService = new RemoveRingService();
      const ring = await removeRingService.execute({ id });

      return res.status(204).json(ring);
    } catch {
      return res.status(500).json({
        error: 'Anel não encontrado.',
      });
    }
  }
}
