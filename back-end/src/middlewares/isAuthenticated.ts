import { NextFunction, Request, Response } from 'express';
import { env } from '../lib/env';
import { JwtPayload, verify } from 'jsonwebtoken';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).end();

  const [, token] = authToken.split(' ');

  try {
    const payload = verify(token, env.JWT_SECRET) as JwtPayload;
    req.userId = payload.sub as string;

    return next();
  } catch {
    return res.status(401).end();
  }
};
