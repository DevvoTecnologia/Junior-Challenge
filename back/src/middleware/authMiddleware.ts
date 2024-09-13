import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/authUtils';
import { error } from 'console';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.code(401).send({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return reply.code(401).send({ error: 'Token is missing' });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };

    if (!decoded || !decoded.userId) {
      return reply.code(401).send({ error: 'Invalid token' });
    }

    request.user = decoded;
  } catch (error) {
    return reply.code(401).send({ error: 'Token Unauthorized' });
  }
};
