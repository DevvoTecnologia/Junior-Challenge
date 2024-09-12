import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateRingService } from '../../services/ring/create-ring-service';

const ringSchema = z.object({
  name: z.string().min(3).max(100),
  power: z.string(),
  bearer: z.string(),
  forgedBy: z.enum(['Elfos', 'Anões', 'Homens', 'Sauron']),
  image: z.string().url(),
});

export class CreateRingController {
  async handle(req: Request, res: Response) {
    try {
      const validatedData = ringSchema.parse(req.body);
      const createRingService = new CreateRingService();

      const ring = await createRingService.execute(validatedData);

      return res.status(201).json(ring);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }

      return res.status(500).json({ error: error.message });
    }
  }
}
