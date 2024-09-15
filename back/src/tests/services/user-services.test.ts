import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import {
  createUserService,
  loginUserService,
  getByUsername,
  getByEmail,
  deleteUserService,
} from '../../services/userService';
import { comparePassword, generateToken, hashPassword } from '../../utils/authUtils';
import User from '../../models/user';

vi.mock('../../models/user', () => ({
  __esModule: true,
  default: {
    create: vi.fn(),
    findOne: vi.fn(),
    destroy: vi.fn(),
  },
}));

vi.mock('../../utils/authUtils', () => ({
  hashPassword: vi.fn(),
  comparePassword: vi.fn(),
  generateToken: vi.fn().mockReturnValue('mock-token'),
}));

describe('User Service', () => {
  const mockUser = {
    username: 'testuserService',
    email: 'test@example.com',
    password: 'password123',
    class: 'class-mock',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('createUserService', () => {
    it('should create a user', async () => {
      const hashedPassword = 'hashedpassword';
      (hashPassword as Mock).mockResolvedValue(hashedPassword);
      (User.create as Mock).mockResolvedValue({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
        password: hashedPassword,
        class: mockUser.class,
      });

      const result = await createUserService(mockUser);

      expect(result).toEqual({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
        class: mockUser.class,
      });
    });

    it('should throw an error when creating a user fails', async () => {
      (hashPassword as Mock).mockResolvedValue('hashedpassword');
      (User.create as Mock).mockRejectedValue(new Error('Database error'));

      await expect(createUserService(mockUser)).rejects.toThrow('Error creating user');
    });
  });

  describe('loginUserService', () => {
    it('should login a user', async () => {
      (User.findOne as Mock).mockResolvedValue({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedpassword',
        class: mockUser.class,
      });
      (comparePassword as Mock).mockResolvedValue(true);

      const result = await loginUserService({
        email: mockUser.email,
        password: mockUser.password,
      });

      expect(result).toEqual({
        user: {
          email: mockUser.email,
          id: 'mock-id',
          username: mockUser.username,
          class: mockUser.class,
        },
        token: undefined,
      });
    });

    it('should throw an error when user not found', async () => {
      (User.findOne as Mock).mockResolvedValue(null);

      await expect(
        loginUserService({ email: mockUser.email, password: mockUser.password })
      ).rejects.toThrow('User not found');
    });

    it('should throw an error when password is invalid', async () => {
      (User.findOne as Mock).mockResolvedValue({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedpassword',
      });
      (comparePassword as Mock).mockResolvedValue(false);

      await expect(
        loginUserService({ email: mockUser.email, password: mockUser.password })
      ).rejects.toThrow('Invalid password');
    });
  });

  describe('getByUsername', () => {
    it('should get a user by username', async () => {
      (User.findOne as Mock).mockResolvedValue(mockUser);

      const user = await getByUsername(mockUser.username);
      expect(user).toEqual(mockUser);
    });
  });

  describe('getByEmail', () => {
    it('should get a user by email', async () => {
      (User.findOne as Mock).mockResolvedValue(mockUser);

      const user = await getByEmail(mockUser.email);
      expect(user).toEqual(mockUser);
    });
  });
});
