import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import prisma from '../../prismaClient';
import {
  createPostService,
  updatePostService,
  deletePostService,
  getPostService,
  getAllPostsService,
} from '../../services/ringService';

vi.mock('../../prismaClient', () => ({
  __esModule: true,
  default: {
    post: {
      create: vi.fn().mockResolvedValue({
        id: 1,
        title: 'Test Post',
        content: 'Test Content',
        authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        createdAt: new Date().toISOString(),
      }),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findMany: vi.fn(),
    },
  },
}));

describe('Post Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a post', async () => {
    const result = await createPostService(
      'Test Post',
      'Test Content',
      '6e6a460b-dd38-4cb5-b93d-103a7239149c'
    );

    expect(result).toEqual(
      expect.objectContaining({
        title: 'Test Post',
        content: 'Test Content',
        authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
        createdAt: expect.any(String),
        id: expect.any(Number),
      })
    );

    expect(prisma.post.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: 'Test Post',
        content: 'Test Content',
        authorId: '6e6a460b-dd38-4cb5-b93d-103a7239149c',
      }),
    });
  });

  it('should throw an error when creating a post fails', async () => {
    (prisma.post.create as Mock).mockRejectedValue(new Error('Database error'));

    await expect(
      createPostService('Test Post', 'Test Content', 'user-uuid')
    ).rejects.toThrow('Error on create post on database');
  });

  it('should update a post', async () => {
    const mockPost = {
      id: 1,
      title: 'Old Title',
      content: 'Old Content',
      authorId: 'user-uuid',
    };
    const updatedPost = { title: 'New Title', content: 'New Content' };

    (prisma.post.findUnique as Mock).mockResolvedValue(mockPost);
    (prisma.post.update as Mock).mockResolvedValue({ ...mockPost, ...updatedPost });

    const result = await updatePostService(1, 'New Title', 'New Content', 'user-uuid');

    expect(result).toEqual({ ...mockPost, ...updatedPost });
    expect(prisma.post.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'New Title', content: 'New Content' },
    });
  });

  it('should throw an error if not authorized to update', async () => {
    const mockPost = {
      id: 1,
      title: 'Old Title',
      content: 'Old Content',
      authorId: 'other-user',
    };
    (prisma.post.findUnique as Mock).mockResolvedValue(mockPost);

    await expect(
      updatePostService(1, 'New Title', 'New Content', 'user-uuid')
    ).rejects.toThrow('Not authorized');
  });

  it('should delete a post', async () => {
    const mockPost = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      authorId: 'user-uuid',
    };
    (prisma.post.findUnique as Mock).mockResolvedValue(mockPost);
    (prisma.post.delete as Mock).mockResolvedValue(mockPost);

    const result = await deletePostService(1, 'user-uuid');
    expect(result).toEqual(mockPost);
    expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw an error if post to delete is not found', async () => {
    (prisma.post.findUnique as Mock).mockResolvedValue(null);

    await expect(deletePostService(1, 'user-uuid')).rejects.toThrow('Post not found');
  });

  it('should throw an error if not authorized to delete', async () => {
    const mockPost = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      authorId: 'other-user',
    };
    (prisma.post.findUnique as Mock).mockResolvedValue(mockPost);

    await expect(deletePostService(1, 'user-uuid')).rejects.toThrow('Not authorized');
  });

  it('should get a post by ID', async () => {
    const mockPost = {
      id: 1,
      title: 'Test Post',
      content: 'Test Content',
      authorId: 'user-uuid',
    };
    (prisma.post.findUnique as Mock).mockResolvedValue(mockPost);

    const result = await getPostService(1);
    expect(result).toEqual(mockPost);
  });

  it('should throw an error when getting a post fails', async () => {
    (prisma.post.findUnique as Mock).mockRejectedValue(new Error('Database error'));

    await expect(getPostService(1)).rejects.toThrow('Database error occurred');
  });

  it('should get all posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1', authorId: 'user-uuid' },
      { id: 2, title: 'Post 2', content: 'Content 2', authorId: 'user-uuid' },
    ];

    (prisma.post.findMany as Mock).mockResolvedValue(mockPosts);

    const result = await getAllPostsService('asc', 'user-uuid');
    expect(result).toEqual(mockPosts);
    expect(prisma.post.findMany).toHaveBeenCalledWith({
      // where: { authorId: 'user-uuid' },
      orderBy: { createdAt: 'asc' },
    });
  });
});
