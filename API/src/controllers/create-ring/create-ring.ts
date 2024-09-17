import { Request, Response } from 'express';
import { RingService } from '../../services/ring-service';

class CreateRingController {
  private ringService: RingService;

  constructor(ringService: RingService) {
    this.ringService = ringService;
  }

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const ring = await this.ringService.createRing(req.body);
      res.status(201).json(ring);
    } catch (error) {
      console.error("Error handling POST /rings:", error);
      res.status(400).json({ error});
    }
  }
}

export { CreateRingController };
