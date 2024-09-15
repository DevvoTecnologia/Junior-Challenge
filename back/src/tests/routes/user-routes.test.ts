import { test, expect, beforeEach, afterEach, describe, vi } from 'vitest';
import { FastifyInstance } from 'fastify';
import { userRoutes } from '../../routes/userRoutes';
import request from 'supertest';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastify from 'fastify';
import sequelize from '../../models';
import { ringRoutes } from '../../routes/ringRoutes';

let app: FastifyInstance;
let id: string;

beforeEach(async () => {
  app = fastify();
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.register(userRoutes);
  await app.register(ringRoutes, { prefix: '/rings' });
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  await app.ready();
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

describe('user routes', () => {
  test('POST /register deve registrar um novo usuário com classe', async () => {
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

  test('POST /register deve retornar erro 400 para dados inválidos', async () => {
    const response = await request(app.server).post('/register').send({
      username: 'testeuser',
      email: 'invalid-email',
      password: mockUser.password,
      class: 'warrior',
    });

    expect(response.status).toBe(400);
  });

  test('POST /login deve logar um usuário', async () => {
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

  test('DELETE /delete/:id deve deletar um usuário', async () => {
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

  test('DELETE /delete/:id deve retornar erro 404 para usuário inexistente', async () => {
    const response = await request(app.server).delete(
      '/delete/00000000-0000-0000-0000-000000003000'
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: 'Not Found',
    });
  });
});
