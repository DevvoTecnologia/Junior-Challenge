import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: number;
    username: string;
  };
}