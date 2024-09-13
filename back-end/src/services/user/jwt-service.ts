import jwt from 'jsonwebtoken';
import { env } from '../../lib/env';

export class JwtService {
  generateToken(userId: string) {
    return jwt.sign({ userId }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }
}
