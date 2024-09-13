import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createRingService,
  deleteRingService,
  getAllRingsService,
  getRingService,
  updateRingService,
} from '../services/ringService';
import { authenticate } from '../middleware/authMiddleware';
import { getById } from '../services/userService';

interface RingParams {
  ringId: string; // Mantém como string para receber do request
}

export const getRing = async (
  request: FastifyRequest<{ Params: RingParams }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await getRingService(Number(ringId)); // Converte para número
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    reply.status(200).send(ring);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const getAllRings = async (request: FastifyRequest, reply: FastifyReply) => {
  const reqUser = request.user;

  if (!reqUser) {
    return reply.status(401).send({ error: 'User not authenticated' });
  }

  try {
    const rings = await getAllRingsService();
    return reply.status(200).send(rings);
  } catch (error) {
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const createRing = async (
  request: FastifyRequest<{
    Body: {
      name: string;
      power: string;
      bearer: string;
      image?: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    await authenticate(request, reply);
    const reqUser = request.user;
    if (!reqUser) {
      return reply.status(400).send({ error: 'Token error' });
    }

    const dataRing = { ...request.body, forgedBy: reqUser.userId };

    const newRing = await createRingService(dataRing);
    reply.status(201).send(newRing);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const updateRing = async (
  request: FastifyRequest<{
    Params: { ringId: string }; // Recebe como string
    Body: { name: string; power: string; bearer: string; image?: string };
  }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    await authenticate(request, reply);
    if (!request.user) {
      return reply.status(400).send({ error: 'Token error' });
    }
    const dataRing = {
      ...request.body,
      forgedBy: request.user.userId,
      id: Number(ringId),
    };

    const ring = await getRingService(Number(ringId));
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    if (ring.bearer !== request.user.userId) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    const updatedRing = await updateRingService(dataRing);
    return reply.status(200).send(updatedRing);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const deleteRing = async (
  request: FastifyRequest<{ Params: { ringId: number } }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;
  try {
    await authenticate(request, reply);

    const reqUser = request.user;
    if (!reqUser) {
      return reply.status(400).send({ error: 'Token error' });
    }

    const ring = await getRingService(ringId);
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    if (ring.bearer !== reqUser.userId) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }

    await deleteRingService(ring.id, reqUser.userId);
    reply.status(204).send();
  } catch (error) {
    console.error(error); // Para ajudar na depuração
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};
