import { FastifyInstance } from 'fastify';
import z from 'zod';
import {
  deleteUser,
  getUser,
  loginUser,
  registerUser,
} from '../controllers/userController';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function userRoutes(app: FastifyInstance) {
  app.withTypeProvider().post(
    '/register',
    {
      schema: {
        summary: 'Register a new user',
        description: 'This endpoint allows a new user to register.',
        tags: ['Users'],
        body: z.object({
          username: z.string().min(3, 'Username must be at least 3 characters long'),
          email: z.string().email('Invalid email address'),
          password: z.string().min(6, 'Password must be at least 6 characters long'),
          class: z.string().min(3, 'Username must be at least 3 characters long'),
        }),
        response: {
          201: z.object({
            id: z.string().uuid(),
            username: z.string(),
            email: z.string(),
            class: z.string().optional(),
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
    registerUser
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    '/login',
    {
      schema: {
        summary: 'Login a user',
        description: 'This endpoint allows an existing user to login.',
        tags: ['Users'],
        body: z.object({
          email: z.string().email('Invalid email address'),
          password: z.string().min(6, 'Password must be at least 6 characters long'),
        }),
        response: {
          200: z.object({
            token: z.string(),
            user: z.object({
              id: z.string().uuid(),
              username: z.string(),
              email: z.string(),
              class: z.string(),
            }),
          }),
          400: z.object({
            error: z.string(),
          }),
          401: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    loginUser
  );
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/:id',
    {
      schema: {
        summary: 'Delete a user',
        description: 'This endpoint allows an admin to delete a user by ID.',
        tags: ['Users'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string().uuid(),
            username: z.string(),
            email: z.string(),
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
    deleteUser
  );
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        summary: 'get user',
        description: 'Get User.',
        tags: ['Users'],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            username: z.string(),
            email: z.string(),
            class: z.string(),
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
    getUser
  );
}
