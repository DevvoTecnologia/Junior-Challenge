import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import {
  createUserService,
  loginUserService,
  getByUsername,
  getByEmail,
  deleteUserService,
} from '../../services/userService';
import { comparePassword, generateToken, hashPassword } from '../../utils/authUtils';
import User from '../../models/user'; // Importando o modelo Sequelize

vi.mock('../../models/User', () => ({
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
      });

      const result = await createUserService(
        mockUser.username,
        mockUser.password,
        mockUser.email
      );

      expect(result).toEqual({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
      });
    });

    it('should throw an error when creating a user fails', async () => {
      (hashPassword as Mock).mockResolvedValue('hashedpassword');
      (User.create as Mock).mockRejectedValue(new Error('Database error'));

      await expect(
        createUserService(mockUser.username, mockUser.password, mockUser.email)
      ).rejects.toThrow('Error creating user');
    });
  });

  describe('loginUserService', () => {
    it('should login a user', async () => {
      (User.findOne as Mock).mockResolvedValue({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedpassword',
      });
      (comparePassword as Mock).mockResolvedValue(true);
      (generateToken as Mock).mockReturnValue('mock-token');

      const result = await loginUserService(mockUser.email, mockUser.password);

      expect(result).toEqual({
        user: {
          email: mockUser.email,
          id: 'mock-id',
          username: mockUser.username,
        },
        token: 'mock-token',
      });
    });

    it('should throw an error when user not found', async () => {
      (User.findOne as Mock).mockResolvedValue(null);

      await expect(loginUserService(mockUser.email, mockUser.password)).rejects.toThrow(
        'User not found'
      );
    });

    it('should throw an error when password is invalid', async () => {
      (User.findOne as Mock).mockResolvedValue({
        id: 'mock-id',
        username: mockUser.username,
        email: mockUser.email,
        password: 'hashedpassword',
      });
      (comparePassword as Mock).mockResolvedValue(false);

      await expect(loginUserService(mockUser.email, mockUser.password)).rejects.toThrow(
        'Invalid password'
      );
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

  describe('deleteUserService', () => {
    it('should delete a user', async () => {
      (User.findOne as Mock).mockResolvedValue(mockUser);
      (User.destroy as Mock).mockResolvedValue(mockUser);

      const user = await deleteUserService('1');
      expect(user).toEqual(mockUser);
    });

    it('should throw an error when user to delete is not found', async () => {
      (User.findOne as Mock).mockResolvedValue(null);

      await expect(deleteUserService('nonexistent-id')).rejects.toThrow('User not found');
    });
  });
});
