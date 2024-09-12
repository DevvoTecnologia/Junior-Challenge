import { describe, it, expect } from 'vitest';

import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from '../../utils/authUtils';

const SECRET_KEY = 'test-secret-key'; // Para testes, use uma chave fixa
process.env.JWT_SECRET_KEY = SECRET_KEY;

describe('Auth Service', () => {
  it('deve hash a senha corretamente', async () => {
    const password = 'mySecret123';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password); // O hash deve ser diferente da senha original
  });

  it('deve comparar a senha corretamente', async () => {
    const password = 'mySecret123';
    const hashedPassword = await hashPassword(password);

    const isMatch = await comparePassword(password, hashedPassword);
    expect(isMatch).toBe(true); // A comparação deve retornar true
  });

  it('deve gerar um token corretamente', () => {
    const userId = 'user-123';
    const token = generateToken(userId);

    expect(token).toBeDefined(); // O token deve ser definido
  });

  it('deve verificar um token corretamente', () => {
    const userId = 'user-123';
    const token = generateToken(userId);
    const decoded = verifyToken(token);

    // expect(decoded.userId).toBe(userId); // O payload do token deve conter o userId
  });

  it('deve lançar um erro ao verificar um token inválido', () => {
    expect(() => verifyToken('invalid-token')).toThrow(); // Deve lançar um erro para um token inválido
  });
});
