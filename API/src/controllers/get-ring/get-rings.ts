import { Request, Response } from 'express';
import { RingService } from '../../services/ring-service';

class GetRingsController {
  private ringService: RingService;

  constructor(ringService: RingService) {
    this.ringService = ringService;
  }

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const rings = await this.ringService.getRings();
      res.status(200).json(rings);
    } catch (error) {
      console.error("Error handling GET /rings:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export { GetRingsController };
