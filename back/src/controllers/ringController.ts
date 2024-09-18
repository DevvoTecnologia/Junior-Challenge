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
    return null;
  }
  return ring;
};

const checkPermission = (ring: any, reqUser: any, reply: FastifyReply) => {
  if (ring.bearer !== reqUser.userId) {
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
    return `Você atingiu o limite de anéis permitidos pela classe.`;
  }
};

export const getRing = async (
  request: FastifyRequest<{ Params: RingParams }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await checkRingExists(ringId, reply);
    if (!ring) return reply.status(404).send({ error: 'Ring not found' });

    return reply.status(200).send(ring);
  } catch (error: any) {
    return reply.status(500).send(error);
  }
};

export const getAllRings = async (request: FastifyRequest, reply: FastifyReply) => {
  const reqUser = await checkAuthentication(request, reply);
  if (!reqUser) return reply.status(403).send({ error: 'Not Authorized' });

  try {
    const rings = await getAllRingsService();
    return reply.status(200).send(rings);
  } catch (error: any) {
    return reply.status(500).send(error);
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
    if (!reqUser) return reply.status(403).send({ error: 'Not Authorized' });

    const portedResult = await checkPortedRings(reqUser.userId);
    if (portedResult === 'Você atingiu o limite de anéis permitidos pela classe.')
      return reply.status(405).send({ error: portedResult });

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
    Params: { ringId: number };
    Body: { name: string; power: string; bearer: string; image?: string };
  }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;
  try {
    const ring = await checkRingExists(ringId, reply);
    if (!ring) return reply.status(404).send({ error: 'Ring not found' });

    const reqUser = await checkAuthentication(request, reply);
    if (!reqUser) return reply.status(403).send({ error: 'Not Authorized' });

    if (!checkPermission(ring, reqUser, reply))
      return reply.status(403).send({ error: 'Unauthorized to perform this action' });
    const updatedRing = await updateRingService({
      ...request.body,
      id: Number(ringId),
    });

    return reply.status(200).send(updatedRing);
  } catch (error: any) {
    return reply.status(500).send(error);
  }
};

export const deleteRing = async (
  request: FastifyRequest<{ Params: { ringId: number } }>,
  reply: FastifyReply
) => {
  const { ringId } = request.params;

  try {
    const ring = await checkRingExists(ringId, reply);
    if (!ring) return reply.status(404).send({ error: 'Ring not found' });

    const reqUser = await checkAuthentication(request, reply);
    if (!reqUser) return reply.status(403).send({ error: 'Not Authorized' });

    if (!checkPermission(ring, reqUser, reply))
      return reply.status(403).send({ error: 'Unauthorized to perform this action' });

    await deleteRingService(ring.id, reqUser.userId);
    return reply.status(204).send({});
  } catch (error: any) {
    return reply.status(500).send(error);
  }
};
