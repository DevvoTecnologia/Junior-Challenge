import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ICustomRequest } from '../types';

const secret = process.env.SECRET as string;

const getTokenFrom = (request: Request) => {
  const authorization = request.headers.authorization;
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
  role?: string
) => {
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const decoded = verify(token, secret) as { role?: string };

  if (role && decoded.role !== role) {
    return res.status(403).send({ error: `Unauthorized, you are not ${role}` });
  }

  (req as ICustomRequest).token = decoded;
  return next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  authenticate(req, res, next);
};

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  authenticate(req, res, next, 'admin');
};
