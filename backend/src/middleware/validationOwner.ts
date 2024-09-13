import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Owner } from '../models/Owner';

export const validateOwner = async (req: Request, res: Response, next: NextFunction) => {
  const owner = new Owner();
  const { owner: ownerData } = req.body;
  owner.name = ownerData.name;

  const errors = await validate(owner);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors });
  }

  req.body.validatedOwner = owner;

  next();
};
