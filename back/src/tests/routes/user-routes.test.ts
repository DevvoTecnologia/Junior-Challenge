import { test, expect, beforeEach, afterEach, describe, vi } from 'vitest';
import { FastifyInstance } from 'fastify';
import request from 'supertest';
import { createApp } from '../setup';

let app: FastifyInstance;
let id: string;

beforeEach(async () => {
  app = await createApp();
});

afterEach(async () => {
  vi.resetAllMocks();
  await app.close();
});

const mockUser = {
  username: 'teeeestuserRoutess',
  password: 'password123dasa',
  email: 'testRoutees@examplee.com',
  id: 'mock-id',
  class: 'warrior',
};

describe('User Routes', () => {
  test('POST /register should register a new user with class', async () => {
    const newUser = {
      username: mockUser.username,
      email: mockUser.email,
      password: mockUser.password,
      class: mockUser.class,
    };
    const userResponse = await request(app.server).post('/register').send(newUser);

    id = userResponse.body.id;

    expect(userResponse.body).toEqual({
      username: mockUser.username,
      email: mockUser.email,
      class: mockUser.class,
      id: expect.any(String),
    });
    expect(userResponse.status).toBe(201);
  });

  test('POST /register should return 400 error for invalid data', async () => {
    const response = await request(app.server).post('/register').send({
      username: 'testeuser',
      email: 'invalid-email',
      password: mockUser.password,
      class: 'warrior',
    });

    expect(response.status).toBe(400);
  });

  test('POST /login should log in a user', async () => {
    await request(app.server).post('/register').send({
      username: mockUser.username,
      email: mockUser.email,
      password: mockUser.password,
      class: mockUser.class,
    });

    const response = await request(app.server).post('/login').send({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        id: expect.any(String),
        username: mockUser.username,
        email: mockUser.email,
        class: mockUser.class,
      },
    });
  });

  test('DELETE /delete/:id should delete a user', async () => {
    const userResponse = await request(app.server).post('/register').send({
      username: mockUser.username,
      email: mockUser.email,
      password: mockUser.password,
      class: mockUser.class,
    });

    const userId = userResponse.body.id;

    const response = await request(app.server).delete(`/delete/${userId}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('DELETE /delete/:id should return 404 error for non-existent user', async () => {
    const response = await request(app.server).delete(
      '/delete/00000000-0000-0000-0000-000300003000'
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'User not found',
    });
  });
});
