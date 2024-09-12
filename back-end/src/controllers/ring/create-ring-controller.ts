import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateRingService } from '../../services/ring/create-ring-service';
import { ringSchema } from '../../validation/ring-schema';

export class CreateRingController {
  async handle(req: Request, res: Response) {
    try {
      const validatedData = ringSchema.parse(req.body);
      const createRingService = new CreateRingService();

      const ring = await createRingService.execute(validatedData);

      return res.status(201).json(ring);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}
