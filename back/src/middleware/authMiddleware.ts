import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/authUtils';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  if (request.url.startsWith('/posts')) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply
        .code(401)
        .send({ success: false, message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return reply.code(401).send({ success: false, message: 'Token is missing' });
    }

    try {
      const decoded = verifyToken(token) as { userId: string };
      // Verifica se a decodificação foi bem-sucedida
      if (!decoded || !decoded.userId) {
        throw new Error('Invalid token');
      }
      request.user = decoded;
    } catch (error) {
      return reply.code(401).send({ success: false, message: 'Unauthorized' });
    }
  }
};
