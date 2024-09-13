import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createRingService,
  deleteRingService,
  getAllRingsService,
  getRingService,
  updateRingService,
} from '../services/ringService';
import { authenticate } from '../middleware/authMiddleware';

interface RingParams {
  ringId: number;
}

export const getRing = async (
  request: FastifyRequest<{ Params: RingParams }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await getRingService(ringId);
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    return reply.status(200).send(ring);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
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
    console.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const createRing = async (
  request: FastifyRequest<{
    Body: {
      name: string;
      power: string;
      bearer: string;
      forgedBy: string;
      image: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    await authenticate(request, reply);
    const reqUser = request.user;

    if (!reqUser) {
      return reply.status(401).send({ error: 'User not authenticated' });
    }

    const newRing = await createRingService({
      ...request.body,
      forgedBy: reqUser.userId,
    });
    return reply.status(201).send(newRing);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const updateRing = async (
  request: FastifyRequest<{
    Params: { ringId: string };
    Body: { name: string; power: string; bearer: string; image?: string };
  }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await getRingService(Number(ringId));
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }

    const reqUser = request.user;

    if (!reqUser) {
      return reply.status(401).send({ error: 'User not authenticated' });
    }
    const updatedRing = await updateRingService({
      ...request.body,
      id: Number(ringId),
    });
    return reply.status(200).send(updatedRing);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const deleteRing = async (
  request: FastifyRequest<{ Params: { ringId: number } }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await getRingService(ringId);
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    await authenticate(request, reply);
    const reqUser = request.user;

    if (!reqUser) {
      return reply.status(401).send({ error: 'User not authenticated' });
    }

    if (ring.bearer !== reqUser.userId) {
      return reply
        .status(403)
        .send({ error: 'Forbidden: Unauthorized to delete this ring' });
    }

    await deleteRingService(ring.id, reqUser.userId);
    return reply.status(204).send({});
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};
