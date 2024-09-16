import { Ring } from '@models/ring';
import { Request, Response } from 'express';

export const getRingById = async (req: Request, res: Response) => {
  try {
    const { ringId } = req.params;

    const ring = await Ring.findById(ringId).populate('portador');

    if (ring) {
      return res.status(200).json(ring);
    }

    return res.status(404).json({ error: 'Ring not found' });
  } catch (error) {
    // Tratamento de erros
    return res.status(500).json({ error: 'Internal server error' });
  }
};
