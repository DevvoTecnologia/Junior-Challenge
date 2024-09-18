import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { generateToken } from '../../utils/authUtils';
import User from '../../models/user';
import Ring from '../../models/ring';
import { createApp } from '../setup';

vi.mock('../services/ringService');

let TOKEN: string;
let app: FastifyInstance;
let ringId: number;
let userId: string;

describe('Ring Routes', () => {
  beforeEach(async () => {
    app = await createApp();

    const mockUser = {
      id: 'd590641f-9976-4928-ba25-e1e0e2f66da8',
      username: 'testRingRoutes',
      password: 'password123',
      email: 'testRingRoutes@example.com',
      class: 'Elfo',
    };
    const user = await User.create(mockUser);
    userId = user.id;

    TOKEN = generateToken(userId);

    const mockRing = {
      name: 'Initial Ring',
      power: 'Invisibility',
      bearer: userId,
      forgedBy: userId,
    };
    const ring = await Ring.create(mockRing);
    ringId = ring.id;
  });

  afterEach(async () => {
    vi.resetAllMocks();

    await app.close();
  });

  describe('POST /rings', () => {
    it('should create a new ring', async () => {
      const newRing = {
        name: 'Test Ring',
        power: 'Invisibility',
        bearer: userId,
        forgedBy: userId,
        image: 'http://example.com/ring.png',
      };

      const response = await request(app.server)
        .post('/rings')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(newRing);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: newRing.name,
        power: newRing.power,
        bearer: newRing.bearer,
        forgedBy: userId,
        image: newRing.image,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
      ringId = response.body.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidRing = {
        name: '',
        power: 'Some power',
      };

      const response = await request(app.server)
        .post('/rings')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(invalidRing);

      expect(response.status).toBe(400);
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .post('/rings')
        .set({ Authorization: `Bearer invalidToken` })
        .send({ name: 'Test Ring', power: 'Invisibility', bearer: userId });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Token Unauthorized' });
    });
  });

  describe('PUT /rings/:id', () => {
    it('should update an existing ring', async () => {
      const updatedRing = {
        name: 'Updated Ring',
        power: 'Teleportation',
        bearer: userId,
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
        bearer: userId,
        forgedBy: userId,
        image: updatedRing.image,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should return 404 if ring not found', async () => {
      const response = await request(app.server)
        .put('/rings/99999999')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send({ name: 'Updated Ring', power: 'New Power' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Ring not found' });
    });
  });

  describe('GET /rings/:id', () => {
    it('should get a ring by id', async () => {
      const response = await request(app.server)
        .get(`/rings/${ringId}`)
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: ringId,
        name: 'Initial Ring',
        power: 'Invisibility',
        bearer: userId,
        forgedBy: userId,
        image: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should return 404 if ring not found', async () => {
      const response = await request(app.server)
        .get('/rings/99999999')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        error: 'Ring not found',
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
          expect.objectContaining({
            id: ringId,
            name: 'Initial Ring',
            power: 'Invisibility',
            bearer: userId,
            forgedBy: userId,
            image: null,
          }),
        ])
      );
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .get('/rings')
        .set({ Authorization: `Bearer invalidToken` });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Token Unauthorized' });
    });
  });

  describe('DELETE /rings/:id', () => {
    it('should delete an existing ring', async () => {
      const response = await request(app.server)
        .delete(`/rings/${ringId}`)
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 if ring not found', async () => {
      const response = await request(app.server)
        .delete('/rings/99999999')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Ring not found' });
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .delete(`/rings/${ringId}`)
        .set({ Authorization: `Bearer invalidToken` });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ error: 'Token Unauthorized' });
    });
  });
});
