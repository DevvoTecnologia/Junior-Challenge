import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Owner } from '../models/Owner';

export const validateOwner = async (req: Request, res: Response, next: NextFunction) => {
  const owner = new Owner();
  const ownerData = req.body.owner;

  if (!ownerData || typeof ownerData !== 'object') {
    return res.status(400).json({ status: 'error', message: 'No owner object provided' });
  }

  Object.assign(owner, ownerData);

  const errors = await validate(owner, { validationError: { target: false } });
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.map((error) => error.constraints) });
  }

  req.body.validatedOwner = owner;

  next();
};
