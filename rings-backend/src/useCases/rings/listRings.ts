import { Ring } from '@models/ring';
import { Request, Response } from 'express';

export const listRings = async (_req: Request, res: Response) => {
  try {
    const rings = await Ring.find().populate('portador').lean();

    return res.status(200).json(rings);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
