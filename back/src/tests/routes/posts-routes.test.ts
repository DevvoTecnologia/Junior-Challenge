import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import fastify, { FastifyInstance } from 'fastify';
import request from 'supertest';
import { postRoutes } from '../../routes/ringRoutes';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { userRoutes } from '../../routes/userRoutes';
import { generateToken } from '../../utils/authUtils';
import prisma from '../../prismaClient';
import { getAllPostsService } from '../../services/ringService';

// vi.mock('../middleware/authMiddleware', () => ({
//   authenticate: (request: FastifyRequest, reply: FastifyReply) => {
//     if (request.headers.authorization === 'Bearer valid-token') {
//       return;
//     } else {
//       reply.code(401).send({ error: 'Unauthorized' });
//     }
//   },
// }));

vi.mock('../services/postService');
let TOKEN: string;
let app: FastifyInstance;
let id: number;
describe('Post Routes', () => {
  beforeEach(async () => {
    app = fastify();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler);
    await app.register(postRoutes, { prefix: '/posts' });
    await app.register(userRoutes);

    await app.ready();
  });

  afterEach(async () => {
    vi.resetAllMocks();
    await app.close();
  });
  const mockUser = {
    id: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
    username: 'testPostRoutes',
    password: 'password123',
    email: 'testPostRoutes@example.com',
  };

  describe('POST /posts', async () => {
    TOKEN = generateToken('6e6a460b-dd38-4cb5-b93d-103a7239149c');
    it('should create a new post', async () => {
      const newPost = {
        title: 'Test Titlee',
        content: 'Test contentt',
      };

      const response = await request(app.server)
        .post('/posts')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(newPost);
      // .expect(201);

      expect(response.body).toEqual({
        id: expect.any(Number),
        title: newPost.title,
        content: newPost.content,
        authorId: mockUser.id,
        createdAt: expect.any(String),
      });
      id = response.body.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidPost = {
        title: 'A very long title exceeding the limit',
        content: 'Test content',
      };

      const response = await request(app.server)
        .post('/posts')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(invalidPost);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: expect.any(String) });
    });

    it('should return 401 Unauthorized', async () => {
      const newPost = {
        title: 'Test Title',
        content: 'Test content',
      };

      const response = await request(app.server)
        .post('/posts')
        .set({ Authorization: `Bearer ${TOKEN}a` })
        .send(newPost);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized', success: false });
    });
  });

  describe('PUT /posts', async () => {
    TOKEN = generateToken('6e6a460b-dd38-4cb5-b93d-103a7239149c');

    it('should update an existing post', async () => {
      const updatedPost = {
        title: 'Updated Titleewe',
        content: 'Updated content',
      };
      const newUser = {
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      };
      await request(app.server).post('/register').send(newUser);
      const postId = id;
      const response = await request(app.server)
        .put(`/posts/${postId}`)
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send(updatedPost);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: id,
        title: updatedPost.title,
        content: updatedPost.content,
        authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        createdAt: expect.any(String),
      });
    });
    it('should return 404 if post not found', async () => {
      const response = await request(app.server)
        .put('/posts/1312312312')
        .set({ Authorization: `Bearer ${TOKEN}` })
        .send({ title: 'Updated Title', content: 'Updated content' });

      expect(response.body).toEqual({ error: 'Post not found' });
      expect(response.status).toBe(404);
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .put('/posts/1')
        .send({ title: 'Updated Title', content: 'Updated content' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        success: false,
        message: 'Authorization header is missing',
      });
    });
  });

  describe('GET /posts/:id', () => {
    it('should return a post by ID', async () => {
      const response = await request(app.server)
        .get(`/posts/${id}`)
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id,
        title: 'Updated Titleewe',
        content: 'Updated content',
        authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        createdAt: expect.any(String),
      });
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app.server)
        .get('/posts/1312312312312232')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Post not found' });
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .get('/posts/1')
        .set({ Authorization: `Bearer ${TOKEN}a` });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({
        message: 'Unauthorized',
        success: false,
      });
    });
  });

  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const response = await request(app.server)
        .get('/posts')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          {
            id,
            title: 'Updated Titleewe',
            content: 'Updated content',
            authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
            createdAt: expect.any(String),
          },
        ])
      );
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .get('/posts')
        .set({ Authorization: `Bearer ${TOKEN}a` });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized', success: false });
    });

    it('should return posts ordered by createdAt in descending order', async () => {
      const response = await request(app.server)
        .get('/posts?order=desc')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            content: expect.any(String),
            authorId: expect.any(String),
            createdAt: expect.any(String),
          }),
        ])
      );
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete an existing post', async () => {
      const response = await request(app.server)
        .delete(`/posts/${id}`)
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should return 404 if post not found', async () => {
      const response = await request(app.server)
        .delete('/posts/312312312312')
        .set({ Authorization: `Bearer ${TOKEN}` });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Post not found' });
    });

    it('should return 401 if unauthorized', async () => {
      const response = await request(app.server)
        .delete(`/posts/${id}`)
        .set({ Authorization: `Bearer ${TOKEN}a` });
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Unauthorized', success: false });
    });
  });
});
