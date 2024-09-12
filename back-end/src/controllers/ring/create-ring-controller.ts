import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { CreateRingService } from '../../services/ring/create-ring-service';
import { createRingSchema } from '../../validation/ring-schema';

export class CreateRingController {
  async handle(req: Request, res: Response) {
    try {
      const validatedData = createRingSchema.parse(req.body);
      const createRingService = new CreateRingService();
      const ring = await createRingService.execute(validatedData);

      return res.status(201).json(ring);
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0].message });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}
