import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { BadRequest } from './routes/_errors/bad-request';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = async (error, request, reply) => {
  const { validation, validationContext } = error;

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: `Error during validation`,
      error: error.flatten().fieldErrors,
    });
  }
  if (error instanceof BadRequest) {
    return reply.status(400).send({ message: error.message });
  }
  return reply.status(500).send({ message: 'Um erro aconteceu' });
};
