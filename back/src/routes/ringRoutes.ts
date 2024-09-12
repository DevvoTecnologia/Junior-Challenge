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
          title: z.string().max(16, 'Title must be less than 16 characters'),
          content: z.string().max(1000, 'Content must be less than 1000 characters'),
          image: z.any(),
        }),
        response: {
          201: z.object({
            id: z.number(),
            title: z.string(),
            content: z.string(),
            authorId: z.string().uuid(),
            createdAt: z.date(),
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
          title: z.string().max(16, 'O texto deve ser menor que 16 caracteres'),
          content: z.string().max(1000),
        }),
        params: z.object({
          ringId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.number(),
            title: z.string(),
            content: z.string(),
            authorId: z.string().uuid(),
            createdAt: z.date(),
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
          ringId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.number(),
            title: z.string(),
            content: z.string(),
            authorId: z.string().uuid(),
            createdAt: z.date(),
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
        querystring: z.object({
          order: z.enum(['asc', 'desc']).default('desc').optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              title: z.string(),
              content: z.string(),
              authorId: z.string().uuid(),
              createdAt: z.date(),
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
          ringId: z.string(),
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
