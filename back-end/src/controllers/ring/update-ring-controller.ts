import { Request, Response } from 'express';
import { updateRingSchema } from '../../validation/ring-schema';
import { UpdateRingService } from '../../services/ring/update-ring-service';
import { z } from 'zod';

export class UpdateRingController {
  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateRingSchema.parse({ ...req.body, id });

      const updateRingService = new UpdateRingService();
      const updatedRing = await updateRingService.execute(validatedData);

      return res.status(200).json(updatedRing);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: error.errors.map(err => err.message).join(', '),
        });
      }

      return res.status(500).json({
        error: 'Erro ao atualizar o anel. Tente novamente mais tarde.',
      });
    }
  }
}
