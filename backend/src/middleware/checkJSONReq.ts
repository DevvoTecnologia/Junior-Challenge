import { NextFunction, Request, Response } from 'express';

export const checkJSONReq = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET' && req.method !== 'DELETE' && !req.is('json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }
  next();
};
