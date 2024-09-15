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
          forgedBy: z.string(),
          image: z.string().url().optional(),
        }),
        response: {
          201: z.object({
            id: z.number(),
            name: z.string(),
            power: z.string(),
            bearer: z.string().uuid(),
            forgedBy: z.string(),
            image: z.string().url().optional().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
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
          forgedBy: z.string().optional(),
          image: z.string().url().optional(),
        }),
        params: z.object({
          ringId: z.string().transform(Number),
        }),
        response: {
          200: z.object({
            id: z.number(),
            name: z.string(),
            power: z.string(),
            bearer: z.string().uuid(),
            forgedBy: z.string(),
            image: z.string().url().optional().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
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
          ringId: z.string().transform(Number),
        }),
        response: {
          200: z.object({
            id: z.number(),
            name: z.string(),
            power: z.string(),
            bearer: z.string().uuid(),
            forgedBy: z.string(),
            image: z.string().url().optional().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
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
              id: z.number(),
              name: z.string(),
              power: z.string(),
              bearer: z.string().uuid(),
              forgedBy: z.string(),
              image: z.string().url().optional().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
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
