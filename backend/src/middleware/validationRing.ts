import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Ring } from '../models/Ring';

export const validateRing = async (req: Request, res: Response, next: NextFunction) => {
  const ring = new Ring();
  const ringData = req.body.ring;

  if (!ringData || typeof ringData !== 'object') {
    return res.status(400).json({ status: 'error', message: 'No ring object provided' });
  }

  Object.assign(ring, ringData);

  const errors = await validate(ring, { validationError: { target: false } });
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map((error) => error.constraints) });
  }

  next();
};
