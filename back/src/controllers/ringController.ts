import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createRingService,
  deleteRingService,
  getAllRingsByBearerId,
  getAllRingsService,
  getRingService,
  updateRingService,
} from '../services/ringService';
import { authenticate } from '../middleware/authMiddleware';
import { getById } from '../services/userService';

interface RingParams {
  ringId: number;
}

const checkAuthentication = async (request: FastifyRequest, reply: FastifyReply) => {
  await authenticate(request, reply);
  const reqUser = request.user;
  if (!reqUser) {
    reply.status(401).send({ error: 'User not authenticated' });
    return null;
  }
  return reqUser;
};

const checkRingExists = async (ringId: number, reply: FastifyReply) => {
  const ring = await getRingService(ringId);
  if (!ring) {
    reply.status(404).send({ error: 'Ring not found' });
    return null;
  }
  return ring;
};

const checkPermission = (ring: any, reqUser: any, reply: FastifyReply) => {
  if (ring.bearer !== reqUser.userId) {
    reply.status(403).send({ error: 'Forbidden: Unauthorized to perform this action' });
    return false;
  }
  return true;
};

const checkPortedRings = async (bearerId: string) => {
  const user = await getById(bearerId);
  if (!user) {
    throw new Error('User not found');
  }
  const rings = (await getAllRingsByBearerId(bearerId)) || [];

  let limit = 0;

  switch (user.class) {
    case 'Elfo':
      limit = 3;
      break;
    case 'Anão':
      limit = 7;
      break;
    case 'Homem':
      limit = 9;
      break;
    case 'Sauron':
      limit = 1;
      break;
    default:
      throw new Error('Raça desconhecida');
  }

  if (rings.length >= limit) {
    throw new Error(
      `${user.class} pode ter no máximo ${limit} anéis. Você possui ${rings.length}.`
    );
  }
};

export const getRing = async (
  request: FastifyRequest<{ Params: RingParams }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await checkRingExists(ringId, reply);
    if (!ring) return;

    return reply.status(200).send(ring);
  } catch (error: any) {
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const getAllRings = async (request: FastifyRequest, reply: FastifyReply) => {
  const reqUser = await checkAuthentication(request, reply);
  if (!reqUser) return;

  try {
    const rings = await getAllRingsService();
    return reply.status(200).send(rings);
  } catch (error: any) {
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
    const reqUser = await checkAuthentication(request, reply);
    if (!reqUser) return;

    await checkPortedRings(reqUser.userId);

    const newRing = await createRingService({
      ...request.body,
      forgedBy: reqUser.userId,
    });

    return reply.status(201).send(newRing);
  } catch (error: any) {
    return reply.status(400).send({ error: error.message });
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
    const ring = await checkRingExists(Number(ringId), reply);
    if (!ring) return;

    const reqUser = await checkAuthentication(request, reply);
    if (!reqUser) return;

    if (!checkPermission(ring, reqUser, reply)) return;

    const updatedRing = await updateRingService({
      ...request.body,
      id: Number(ringId),
    });

    return reply.status(200).send(updatedRing);
  } catch (error: any) {
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

export const deleteRing = async (
  request: FastifyRequest<{ Params: { ringId: number } }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await checkRingExists(ringId, reply);
    if (!ring) return;

    const reqUser = await checkAuthentication(request, reply);
    if (!reqUser) return;

    if (!checkPermission(ring, reqUser, reply)) return;

    await deleteRingService(ring.id, reqUser.userId);
    return reply.status(204).send({});
  } catch (error: any) {
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};
