// src/controllers/userController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createUserService,
  deleteUserService,
  getById,
  getByUsername,
  loginUserService,
} from '../services/userService';

export const registerUser = async (
  request: FastifyRequest<{
    Body: { username: string; password: string; email: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const data = request.body;

    if (await getByUsername(data.username)) {
      throw new Error('User already exists');
    }
    const user = await createUserService(data);
    reply.status(201).send({ id: user.id, email: user.email, username: user.username });
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
  try {
    const loginData = request.body;
    const result = await loginUserService(loginData);

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
