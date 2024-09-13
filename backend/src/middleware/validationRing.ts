import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Ring } from '../models/Ring';

export const validateRing = async (req: Request, res: Response, next: NextFunction) => {
  const ring = new Ring();
  const { ring: ringData } = req.body;
  ring.name = ringData.name;
  ring.power = ringData.power;
  ring.forgedBy = ringData.forgedBy;
  ring.image = ringData.image;

  const errors = await validate(ring);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  req.body.validatedRing = ring;

  next();
};
