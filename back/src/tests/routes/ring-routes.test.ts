import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fastify, { FastifyInstance } from 'fastify';
import request from 'supertest';
import { ringRoutes } from '../../routes/ringRoutes';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { generateToken } from '../../utils/authUtils';

vi.mock('../services/ringService');
let TOKEN: string;
let app: FastifyInstance;
let ringId: number; // Alterado para número

describe('Ring Routes', () => {
  beforeEach(async () => {
    app = fastify();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
    await app.register(ringRoutes, { prefix: '/rings' });

    await app.ready();

    // Criar um anel fictício para os testes
    const mockRing = {
      id: 1, // Supondo que o primeiro ID será 1
      name: 'Initial Ring',
      power: 'Invisibility',
      bearer: '550e8400-e29b-41d4-a716-446655440000',
      forgedBy: '550e8400-e29b-41d4-a716-446655440000',
    };
    ringId = mockRing.id; // Armazena o ID para uso em testes
  });

  afterEach(async () => {
    vi.resetAllMocks();
    await app.close();
  });

  const mockUser = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'testRingRoutes',
    password: 'password123',
    email: 'testRingRoutes@example.com',
  };

  TOKEN = generateToken(mockUser.id);

  describe('POST /rings', () => {
    it('should create a new ring', async () => {
      const newRing = {
        name: 'Test Ring',
        power: 'Invisibility',
        bearer: mockUser.id,
        image: 'http://example.com/ring.png',
      };

      const response = await request(app.server)
        .post('/rings')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(newRing);

      // expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: newRing.name,
        power: newRing.power,
        bearer: newRing.bearer,
        forgedBy: mockUser.id,
        createdAt: expect.any(String),
      });
      ringId = response.body.id; // Atualiza o ID para uso posterior
    });

    it('should return 400 for invalid data', async () => {
      const invalidRing = {
        name: 'A very long name exceeding the limit',
        power: 'Some power',
      };

      const response = await request(app.server)
        .post('/rings')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(invalidRing);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: expect.any(String) });
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .post('/rings')
        .set({ Authorization: `Bearer invalidToken` })
        .send({ name: 'Test Ring', power: 'Invisibility', bearer: mockUser.id });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Token Unauthorized' });
    });
  });

  describe('PUT /rings/:ringId', () => {
    it('should update an existing ring', async () => {
      const updatedRing = {
        name: 'Updated Ring',
        power: 'Teleportation',
        bearer: mockUser.id,
        image: 'http://example.com/updated_ring.png',
      };

      const response = await request(app.server)
        .put(`/rings/${ringId}`)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(updatedRing);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: ringId,
        name: updatedRing.name,
        power: updatedRing.power,
        bearer: updatedRing.bearer,
        forgedBy: mockUser.id,
      });
    });

    it('should return 404 if ring not found', async () => {
      const response = await request(app.server)
        .put('/rings/99999999') // ID que não existe
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send({ name: 'Updated Ring', power: 'New Power' });

      expect(response.body).toEqual({ error: 'Ring not found' });
      expect(response.status).toBe(404);
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .put(`/rings/${ringId}`)
        .send({ name: 'Updated Ring', power: 'New Power' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'Authorization header is missing',
      });
    });
  });

  describe('GET /rings/:id', () => {
    it('should return a ring by ID', async () => {
      const response = await request(app.server)
        .get(`/rings/${ringId}`)
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: ringId,
        name: 'Initial Ring',
        power: 'Invisibility',
        bearer: mockUser.id,
        forgedBy: mockUser.id,
        createdAt: expect.any(String),
      });
    });

    it('should return 404 if ring not found', async () => {
      const response = await request(app.server)
        .get('/rings/99999999')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Ring not found' });
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .get('/rings/1')
        .set({ Authorization: `Bearer ${TOKEN}a` });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        error: 'Token Unauthorized',
      });
    });
  });

  describe('GET /rings', () => {
    it('should return all rings', async () => {
      const response = await request(app.server)
        .get('/rings')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
            id: ringId,
            name: 'Initial Ring',
            power: 'Invisibility',
            bearer: mockUser.id,
            forgedBy: mockUser.id,
            createdAt: expect.any(String),
          },
        ])
      );
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .get('/rings')
        .set({ Authorization: `Bearer ${TOKEN}a` });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Token Unauthorized' });
    });
  });

  describe('DELETE /rings/:id', () => {
    it('should delete an existing ring', async () => {
      const response = await request(app.server)
        .delete(`/rings/${ringId}`)
        .set({ Authorization: `Bearer ${TOKEN}` });

      // expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 if ring not found', async () => {
      const response = await request(app.server)
        .delete('/rings/99999999')
        .set({ Authorization: `Bearer ${TOKEN}` });

      // expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Ring not found' });
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .delete(`/rings/${ringId}`)
        .set({ Authorization: `Bearer ${TOKEN}a` });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Token Unauthorized' });
    });
  });
});
