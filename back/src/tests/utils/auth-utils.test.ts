import { describe, it, expect } from 'vitest';

import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from '../../utils/authUtils';

describe('Auth Service', () => {
  it('deve hash a senha corretamente', async () => {
    const password = 'mySecret123';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
  });

  it('deve comparar a senha corretamente', async () => {
    const password = 'mySecret123';
    const hashedPassword = await hashPassword(password);

    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('deve gerar um token corretamente', () => {
    const userId = 'user-123';
    const token = generateToken(userId);

    expect(token).toBeDefined();
  });

  it('deve verificar um token corretamente', () => {
    const userId = 'user-123';
    const token = generateToken(userId);
    const decoded = verifyToken(token);
    expect(decoded).toStrictEqual({
      userId,
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('deve lançar um erro ao verificar um token inválido', () => {
    expect(() => verifyToken('invalid-token')).toThrow();
  });
});
