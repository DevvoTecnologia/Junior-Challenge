// src/controllers/userController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createUserService,
  deleteUserService,
  getByUsername,
  loginUserService,
} from '../services/userService';

export const registerUser = async (
  request: FastifyRequest<{
    Body: { username: string; password: string; email: string };
  }>,
  reply: FastifyReply
) => {
  const { username, password, email } = request.body;

  try {
    if (await getByUsername(username)) {
      throw new Error('User already exists');
    }
    const user = await createUserService(username, password, email);
    reply.status(201).send(user);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const loginUser = async (
  request: FastifyRequest<{
    Body: { password: string; email: string };
  }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;

  try {
    if (!email) {
      return reply.status(400).send({ error: 'Email is required.' });
    }

    const result = await loginUserService(email, password);

    return reply.status(200).send(result);
  } catch (error: any) {
    if (error.statusCode) {
      return reply.status(error.statusCode).send({ error: error.message });
    }
    return reply.status(500).send(error);
  }
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const idUser = request.params.id;
  if (!idUser) {
    throw new Error('Id not provided');
  }
  try {
    await deleteUserService(idUser);
    reply.status(200).send();
  } catch (error) {
    reply.status(404).send(error);
  }
};
