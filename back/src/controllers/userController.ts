import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createUserService,
  deleteUserService,
  getById,
  getByUsername,
  getUserService,
  loginUserService,
} from '../services/userService';

export const registerUser = async (
  request: FastifyRequest<{
    Body: { username: string; password: string; email: string; class: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const data = request.body;

    if (await getByUsername(data.username)) {
      throw new Error('User already exists');
    }
    const user = await createUserService(data);
    reply.status(201).send({
      id: user.id,
      email: user.email,
      username: user.username,
      class: user.class,
    });
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
    return reply.status(400).send({ error: 'Id not provided' });
  }
  const user = await getById(idUser);
  if (!user) {
    return reply.status(404).send({ error: 'User not found' });
  }

  try {
    await deleteUserService(idUser);
    reply.status(204).send();
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const idUser = request.params.id;
    if (!idUser) {
      return reply.status(400).send({ error: 'Id not provided' });
    }

    const user = await getById(idUser);
    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const result = await getUserService(idUser);

    reply.status(200).send(result);
  } catch (error) {
    reply.status(500).send(error);
  }
};
