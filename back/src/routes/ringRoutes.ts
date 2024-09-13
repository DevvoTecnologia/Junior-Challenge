import { FastifyInstance } from 'fastify';
import z from 'zod';
import {
  createRing,
  deleteRing,
  getAllRings,
  getRing,
  updateRing,
} from '../controllers/ringController';
import { authenticate } from '../middleware/authMiddleware';

export async function ringRoutes(fastify: FastifyInstance) {
  fastify.addHook('onRequest', authenticate);

  fastify.post(
    '/',
    {
      schema: {
        summary: 'Create a new ring',
        description: 'This endpoint allows a user to create a new ring.',
        tags: ['Rings'],
        body: z.object({
          name: z.string().max(16, 'Name must be less than 16 characters'),
          power: z
            .string()
            .max(1000, 'Power description must be less than 1000 characters'),
          bearer: z.string().uuid(),
          forgedBy: z.string().uuid(), // Adicionei forgedBy
          image: z.string().url().optional(),
        }),
        response: {
          201: z.object({
            id: z.number(), // Ajustado para number
            name: z.string(),
            power: z.string(),
            bearer: z.string().uuid(),
            forgedBy: z.string().uuid(),
            image: z.string().optional(),
          }),
          400: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    createRing
  );

  fastify.put(
    '/:ringId',
    {
      schema: {
        summary: 'Update ring',
        tags: ['Rings'],
        body: z.object({
          name: z.string().max(16, 'Name must be less than 16 characters').optional(),
          power: z
            .string()
            .max(1000, 'Power description must be less than 1000 characters')
            .optional(),
          bearer: z.string().uuid().optional(),
          image: z.string().url().optional(),
        }),
        params: z.object({
          ringId: z.string().transform(Number), // Alterado para number
        }),
        response: {
          200: z.object({
            id: z.number(), // Ajustado para number
            name: z.string(),
            power: z.string(),
            bearer: z.string().uuid(),
            forgedBy: z.string().uuid(),
            image: z.string().optional(),
            createdAt: z.string(), // Se necessário
          }),
          400: z.object({
            error: z.string(),
          }),
          404: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    updateRing
  );

  fastify.get(
    '/:ringId',
    {
      schema: {
        summary: 'Get ring by id',
        tags: ['Rings'],
        params: z.object({
          ringId: z.string().transform(Number), // Alterado para number
        }),
        response: {
          200: z.object({
            id: z.number(), // Ajustado para number
            name: z.string(),
            power: z.string(),
            bearer: z.string().uuid(),
            forgedBy: z.string().uuid(),
            image: z.string().url().optional(),
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    getRing
  );

  fastify.get(
    '/',
    {
      schema: {
        summary: 'Get all rings',
        tags: ['Rings'],
        response: {
          200: z.array(
            z.object({
              id: z.number(), // Ajustado para number
              name: z.string(),
              power: z.string(),
              bearer: z.string().uuid(),
              forgedBy: z.string().uuid(),
              image: z.string().url().optional(),
              createdAt: z.string(),
            })
          ),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    getAllRings
  );

  fastify.delete(
    '/:ringId',
    {
      schema: {
        summary: 'Delete ring',
        tags: ['Rings'],
        params: z.object({
          ringId: z.string().transform(Number),
        }),
        response: {
          204: z.object({}),
          404: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    deleteRing
  );
}
