import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import {
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from '../../controllers/ringController';
import * as postService from '../../services/ringService';
import { generateToken } from '../../utils/authUtils';

const createApp = (): FastifyInstance => {
  const app = Fastify();
  app.get('/posts/:postId', getPost);
  app.get('/posts', getAllPosts);
  app.post('/posts', createPost);
  app.put('/posts/:postId', updatePost);
  app.delete('/posts/:postId', deletePost);
  return app;
};

describe('Posts Controller', () => {
  let app: FastifyInstance;
  const TOKEN = generateToken('6e6a460b-dd38-4cb5-b93d-103a7239149c');

  beforeEach(() => {
    app = createApp();
    vi.spyOn(postService, 'getPostService').mockImplementation(vi.fn() as any);
    vi.spyOn(postService, 'getAllPostsService').mockImplementation(vi.fn() as any);
    vi.spyOn(postService, 'createPostService').mockImplementation(vi.fn() as any);
    vi.spyOn(postService, 'updatePostService').mockImplementation(vi.fn() as any);
    vi.spyOn(postService, 'deletePostService').mockImplementation(vi.fn() as any);
  });

  describe('GET', () => {
    it('should return a post by ID', async () => {
      const mockPost = {
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        authorId: 'user-uuid',
      };
      (postService.getPostService as Mock).mockReturnValueOnce(Promise.resolve(mockPost));

      const response = await app.inject({
        method: 'GET',
        url: '/posts/1',
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toEqual(mockPost);
    });

    it('should return 404 if post not found', async () => {
      (postService.getPostService as Mock).mockReturnValueOnce(Promise.resolve(null));

      const response = await app.inject({
        method: 'GET',
        url: '/posts/1',
      });

      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({ error: 'Post not found' });
    });

    it('should return all posts', async () => {
      const mockPosts = [
        { id: 1, title: 'Post 1', content: 'Content 1', authorId: 'user-uuid' },
        { id: 2, title: 'Post 2', content: 'Content 2', authorId: 'user-uuid' },
      ];
      (postService.getAllPostsService as Mock).mockReturnValueOnce(
        Promise.resolve(mockPosts)
      );

      const response = await app.inject({
        method: 'GET',
        url: '/posts?order=desc',
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual(mockPosts);
    });
  });

  describe('POST', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'New Post',
        content: 'New Content',
      };

      (postService.createPostService as Mock).mockReturnValueOnce(
        Promise.resolve({ id: 1, ...newPost })
      );

      const response = await app.inject({
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}` },
        url: '/posts',
        payload: newPost,
      });

      expect(response.statusCode).toBe(201);
      expect(response.json()).toEqual({ id: 1, ...newPost });
    });

    it('should return 401 if token is missing', async () => {
      const newPost = {
        title: 'New Post',
        content: 'New Content',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/posts',
        payload: newPost,
      });

      expect(response.statusCode).toBe(401);
      expect(response.json()).toEqual({
        message: 'Authorization header is missing',
        success: false,
      });
    });
  });

  describe('PUT', () => {
    it('should update a post', async () => {
      const updatedPost = { title: 'Updated Title', content: 'Updated Content' };
      (postService.getPostService as Mock).mockReturnValueOnce(
        Promise.resolve({ id: 1, authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c' })
      );
      (postService.updatePostService as Mock).mockReturnValueOnce(
        Promise.resolve({ id: 1, ...updatedPost })
      );

      const response = await app.inject({
        method: 'PUT',
        headers: { Authorization: `Bearer ${TOKEN}` },
        url: '/posts/1',
        payload: updatedPost,
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ id: 1, ...updatedPost });
    });

    it('should return 404 if post to update not found', async () => {
      (postService.getPostService as Mock).mockReturnValueOnce(Promise.resolve(null));

      const updatedPost = { title: 'Updated Title', content: 'Updated Content' };
      const response = await app.inject({
        method: 'PUT',
        headers: { Authorization: `Bearer ${TOKEN}` },
        url: '/posts/99',
        payload: updatedPost,
      });

      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({ error: 'Post not found' });
    });

    it('should return 401 if user is not the author when updating', async () => {
      (postService.getPostService as Mock).mockReturnValueOnce(
        Promise.resolve({ id: 1, authorId: 'other-user-uuid' })
      );

      const updatedPost = { title: 'Updated Title', content: 'Updated Content' };
      const response = await app.inject({
        method: 'PUT',
        headers: { Authorization: `Bearer ${TOKEN}` },
        url: '/posts/1',
        payload: updatedPost,
      });

      expect(response.statusCode).toBe(401);
      expect(response.json()).toEqual({ error: 'Unauthorized' });
    });
  });

  describe('DELETE', () => {
    it('should delete a post', async () => {
      (postService.getPostService as Mock).mockReturnValueOnce(
        Promise.resolve({ id: 1, authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c' })
      );
      (postService.deletePostService as Mock).mockReturnValueOnce(
        Promise.resolve(undefined)
      );

      const response = await app.inject({
        method: 'DELETE',
        url: '/posts/1',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      expect(response.statusCode).toBe(204);
    });

    it('should return 404 if post to delete not found', async () => {
      (postService.getPostService as Mock).mockReturnValueOnce(Promise.resolve(null));

      const response = await app.inject({
        method: 'DELETE',
        url: '/posts/453485345',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      expect(response.statusCode).toBe(404);
      expect(response.json()).toEqual({ error: 'Post not found' });
    });

    it('should return 401 if user is not the author when deleting', async () => {
      (postService.getPostService as Mock).mockReturnValueOnce(
        Promise.resolve({ id: 1, authorId: 'other-user-uuid' })
      );

      const response = await app.inject({
        method: 'DELETE',
        url: '/posts/1',
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      expect(response.statusCode).toBe(401);
      expect(response.json()).toEqual({ error: 'Unauthorized' });
    });
  });
});
