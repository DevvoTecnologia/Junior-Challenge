import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { registerUser, loginUser, deleteUser } from '../../controllers/userController';
import {
  createUserService,
  deleteUserService,
  getByUsername,
  loginUserService,
} from '../../services/userService';
import { FastifyRequest, FastifyReply } from 'fastify';

vi.mock('../../services/userService');

describe('UserController', () => {
  let mockReply: FastifyReply;

  beforeEach(() => {
    mockReply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;
    vi.clearAllMocks();
  });

  const mockUser = {
    username: 'testuserController',
    password: 'password123',
    email: 'testController@example.com',
    id: 'mock-id',
  };

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      (getByUsername as Mock).mockResolvedValue(null);
      (createUserService as Mock).mockResolvedValue(mockUser);

      const mockRequest = {
        body: mockUser,
      } as FastifyRequest<{ Body: typeof mockUser }>;

      await registerUser(mockRequest, mockReply);

      expect(getByUsername).toHaveBeenCalledWith(mockUser.username);
      expect(createUserService).toHaveBeenCalledWith(
        mockUser.username,
        mockUser.password,
        mockUser.email
      );
      expect(mockReply.status).toHaveBeenCalledWith(201);
      expect(mockReply.send).toHaveBeenCalledWith(mockUser);
    });

    it('should return 500 if user already exists', async () => {
      (getByUsername as Mock).mockResolvedValue(mockUser);

      const mockRequest = {
        body: mockUser,
      } as FastifyRequest<{ Body: typeof mockUser }>;

      await registerUser(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      (loginUserService as Mock).mockResolvedValue({
        token: 'mock-token',
        user: mockUser,
      });

      const mockRequest = {
        body: {
          email: mockUser.email,
          password: mockUser.password,
        },
      } as FastifyRequest<{ Body: { email: string; password: string } }>;

      await loginUser(mockRequest, mockReply);

      expect(loginUserService).toHaveBeenCalledWith(mockUser.email, mockUser.password);
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith({
        token: 'mock-token',
        user: mockUser,
      });
    });

    it('should return 400 if email is missing', async () => {
      const mockRequest = {
        body: {
          password: mockUser.password,
        },
      } as FastifyRequest<{ Body: { email: string; password: string } }>;

      await loginUser(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(400);
      expect(mockReply.send).toHaveBeenCalledWith({ error: 'Email is required.' });
    });

    it('should return 500 on login service failure', async () => {
      (loginUserService as Mock).mockRejectedValue(new Error('Login failed'));

      const mockRequest = {
        body: {
          email: mockUser.email,
          password: mockUser.password,
        },
      } as FastifyRequest<{ Body: { email: string; password: string } }>;

      await loginUser(mockRequest, mockReply);

      expect(mockReply.status).toHaveBeenCalledWith(500);
      expect(mockReply.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      const id = 'mock-id'; // Defina um ID de mock
      (deleteUserService as Mock).mockResolvedValue(undefined);

      const mockRequest = {
        params: {
          id,
        },
      } as FastifyRequest<{ Params: { id: string } }>;

      await deleteUser(mockRequest, mockReply);

      expect(deleteUserService).toHaveBeenCalledWith(id);
      expect(mockReply.status).toHaveBeenCalledWith(200);
      expect(mockReply.send).toHaveBeenCalledWith();
    });

    it('should return 404 if user is not found', async () => {
      const id = mockUser.id; // Defina um ID de mock
      (deleteUserService as Mock).mockRejectedValue(new Error('User not found'));

      const mockRequest = {
        params: {
          id,
        },
      } as FastifyRequest<{ Params: { id: string } }>;

      await deleteUser(mockRequest, mockReply);

      expect(deleteUserService).toHaveBeenCalledWith(id);
      expect(mockReply.status).toHaveBeenCalledWith(404);
      expect(mockReply.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
