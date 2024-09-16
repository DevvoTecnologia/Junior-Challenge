import { Bearer } from '@models/bearer';
import { Request, Response } from 'express';

export const createBearer = async (req: Request, res: Response) => {
  try {
    const { nome, historia } = req.body;

    const bearer = await Bearer.create({
      nome,
      historia,
      aneis: [],
    });

    return res.status(201).json(bearer);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
};
