import { Bearer } from '@models/bearer';
import { Request, Response } from 'express';

export const listBearers = async (_req: Request, res: Response) => {
  try {
    const bearers = await Bearer.find().lean();

    return res.status(200).json(bearers);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
