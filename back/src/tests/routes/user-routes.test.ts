import { test, expect, beforeEach, afterEach, describe, vi } from 'vitest';
import { FastifyInstance } from 'fastify';
import { userRoutes } from '../../routes/userRoutes';
import request from 'supertest';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastify from 'fastify';

let app: FastifyInstance;
let id: string;

beforeEach(async () => {
  app = fastify();
  Promise.all([
    app.register(userRoutes),
    app.setValidatorCompiler(validatorCompiler),
    app.setSerializerCompiler(serializerCompiler),
  ]);
  await app.ready();
});

afterEach(async () => {
  vi.resetAllMocks();
  await app.close();
});
const mockUser = {
  username: 'testuserRoutes',
  password: 'password123',
  email: 'testRoutes@example.com',
  id: 'mock-id',
};
describe('user routes', () => {
  test('POST /register deve registrar um novo usuário', async () => {
    const newUser = {
      username: mockUser.username,
      email: mockUser.email,
      password: mockUser.password,
    };

    const userResponse = await request(app.server).post('/register').send(newUser);
    id = userResponse.body.id;
    expect(userResponse.status).toBe(201);
    expect(userResponse.body).toEqual({
      username: mockUser.username,
      email: mockUser.email,
      id: expect.any(String),
    });
  });

  test('POST /register deve retornar erro 400 para dados inválidos', async () => {
    const response = await request(app.server).post('/register').send({
      username: 'testeuser',
      email: 'invalid-email',
      password: mockUser.password,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: expect.any(String),
    });
  });

  test('POST /login deve logar um usuário', async () => {
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
      },
    });
  });

  test('DELETE /delete/:id deve deletar um usuário', async () => {
    const response = await request(app.server).delete(`/delete/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });

  test('DELETE /delete/:id deve retornar erro 404 para usuário inexistente', async () => {
    const response = await request(app.server).delete(
      '/delete/00000000-0000-0000-0000-000000000000'
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: expect.any(String),
    });
  });
});
