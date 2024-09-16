import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  _id: string;
  name: string;
  username: string;
  passwordHash: string;
  email: string;
  role: string;
}

export interface ICustomRequest extends Request {
  token: string | JwtPayload;
}

export type role = 'admin' | 'user';

export enum RingType {
  Elves = 'Elfos',
  Dwarves = 'Anões',
  Men = 'Homens',
  Sauron = 'Sauron',
}
