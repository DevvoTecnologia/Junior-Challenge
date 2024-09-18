import { describe, it, expect } from 'vitest';

import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from '../../utils/authUtils';

describe('Auth Service', () => {
  describe('Password Hashing', () => {
    it('should hash the password correctly', async () => {
      const password = 'mySecret123';
      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).not.toBe(password);
    });
  });

  describe('Password Comparison', () => {
    it('should compare the password correctly', async () => {
      const password = 'mySecret123';
      const hashedPassword = await hashPassword(password);

      const isMatch = await comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });
  });

  describe('Token Generation', () => {
    it('should generate a token correctly', () => {
      const userId = 'user-123';
      const token = generateToken(userId);

      expect(token).toBeDefined();
    });
  });

  describe('Token Verification', () => {
    it('should verify a token correctly', () => {
      const userId = 'user-123';
      const token = generateToken(userId);
      const decoded = verifyToken(token);
      expect(decoded).toStrictEqual({
        userId,
        iat: expect.any(Number),
        exp: expect.any(Number),
      });
    });

    it('should throw an error when verifying an invalid token', () => {
      expect(() => verifyToken('invalid-token')).toThrow();
    });
  });
});
