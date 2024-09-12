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
  ringId: string;
}

export const getRing = async (
  request: FastifyRequest<{ Params: RingParams }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;
  try {
    const ring = await getRingService(ringId);
    if (!ring) {
      reply.status(404).send({ error: 'Ring not found' });
    }
    reply.status(201).send(ring);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const getAllRings = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = request.user;
  try {
    const rings = await getAllRingsService();
    reply.status(200).send(rings);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const createRing = async (
  request: FastifyRequest<{
    Body: {
      title: string;
      content: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    await authenticate(request, reply);
    if (!request.user) {
      return reply.status(400).send({ error: 'Token error' });
    }
    const user = await getById(request.user.userId);
    if (!user) {
      return reply.status(400).send({ error: 'Error on get user by id' });
    }

    const { title, content } = request.body;

    const data = await request.file();
    if (!data) {
      console.log(data);
      return;
    }

    console.log(request.body);
    const ring = await createRingService(title, content, user.id);
    reply.status(201).send(ring);
  } catch (error) {
    reply.status(500).send({ error });
  }
};

export const updateRing = async (
  request: FastifyRequest<{
    Params: { ringId: string };
    Body: { title: string; content: string; image: FileList };
  }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;
  const { title, content, image } = request.body;
  console.log(request.body);
  console.log(image);
  try {
    await authenticate(request, reply);

    if (!request.user) {
      return reply.status(400).send({ error: 'Token error' });
    }
    const user = await getById(request.user.userId);
    if (!user) {
      return reply.status(400).send({ error: 'Error on get user by id' });
    }

    const ring = await getRingService(ringId);
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    if (ring.authorId !== user.id) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
    const updatedRing = await updateRingService(Number(ringId), title, content, user.id);
    return reply.status(200).send(updatedRing);
  } catch (error) {
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const deleteRing = async (
  request: FastifyRequest<{ Params: { ringId: string } }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    await authenticate(request, reply);

    if (!request.user) {
      return reply.status(400).send({ error: 'Token error' });
    }
    const user = await getById(request.user.userId);
    if (!user) {
      return reply.status(400).send({ error: 'Error on get user by id' });
    }

    const ring = await getRingService(ringId);
    if (!ring) {
      return reply.status(404).send({ error: 'Ring not found' });
    }
    if (ring.authorId != user.id) {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
    const result = await deleteRingService(ringId, user.id);
    reply.status(204).send(result);
  } catch (error) {
    reply.status(500).send({ error: error || 'Internal Server Error' });
  }
};
