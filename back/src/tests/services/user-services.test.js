"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const userService_1 = require("../../services/userService");
const authUtils_1 = require("../../utils/authUtils");
const user_1 = __importDefault(require("../../models/user"));
vitest_1.vi.mock('../../models/user', () => ({
    __esModule: true,
    default: {
        create: vitest_1.vi.fn(),
        findOne: vitest_1.vi.fn(),
        destroy: vitest_1.vi.fn(),
    },
}));
vitest_1.vi.mock('../../utils/authUtils', () => ({
    hashPassword: vitest_1.vi.fn(),
    comparePassword: vitest_1.vi.fn(),
    generateToken: vitest_1.vi.fn().mockReturnValue('mock-token'),
}));
(0, vitest_1.describe)('User Service', () => {
    const mockUser = {
        username: 'testuserService',
        email: 'test@example.com',
        password: 'password123',
        class: 'class-mock',
    };
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.resetAllMocks();
    });
    (0, vitest_1.describe)('createUserService', () => {
        (0, vitest_1.it)('should create a user', async () => {
            const hashedPassword = 'hashedpassword';
            authUtils_1.hashPassword.mockResolvedValue(hashedPassword);
            user_1.default.create.mockResolvedValue({
                id: 'mock-id',
                username: mockUser.username,
                email: mockUser.email,
                password: hashedPassword,
                class: mockUser.class,
            });
            const result = await (0, userService_1.createUserService)(mockUser);
            (0, vitest_1.expect)(result).toEqual({
                id: 'mock-id',
                username: mockUser.username,
                email: mockUser.email,
                class: mockUser.class,
            });
        });
        (0, vitest_1.it)('should throw an error when creating a user fails', async () => {
            authUtils_1.hashPassword.mockResolvedValue('hashedpassword');
            user_1.default.create.mockRejectedValue(new Error('Database error'));
            await (0, vitest_1.expect)((0, userService_1.createUserService)(mockUser)).rejects.toThrow('Error creating user');
        });
    });
    (0, vitest_1.describe)('loginUserService', () => {
        (0, vitest_1.it)('should login a user', async () => {
            user_1.default.findOne.mockResolvedValue({
                id: 'mock-id',
                username: mockUser.username,
                email: mockUser.email,
                password: 'hashedpassword',
                class: mockUser.class,
            });
            authUtils_1.comparePassword.mockResolvedValue(true);
            const result = await (0, userService_1.loginUserService)({
                email: mockUser.email,
                password: mockUser.password,
            });
            (0, vitest_1.expect)(result).toEqual({
                user: {
                    email: mockUser.email,
                    id: 'mock-id',
                    username: mockUser.username,
                    class: mockUser.class,
                },
                token: undefined,
            });
        });
        (0, vitest_1.it)('should throw an error when user not found', async () => {
            user_1.default.findOne.mockResolvedValue(null);
            await (0, vitest_1.expect)((0, userService_1.loginUserService)({ email: mockUser.email, password: mockUser.password })).rejects.toThrow('User not found');
        });
        (0, vitest_1.it)('should throw an error when password is invalid', async () => {
            user_1.default.findOne.mockResolvedValue({
                id: 'mock-id',
                username: mockUser.username,
                email: mockUser.email,
                password: 'hashedpassword',
            });
            authUtils_1.comparePassword.mockResolvedValue(false);
            await (0, vitest_1.expect)((0, userService_1.loginUserService)({ email: mockUser.email, password: mockUser.password })).rejects.toThrow('Invalid password');
        });
    });
    (0, vitest_1.describe)('getByUsername', () => {
        (0, vitest_1.it)('should get a user by username', async () => {
            user_1.default.findOne.mockResolvedValue(mockUser);
            const user = await (0, userService_1.getByUsername)(mockUser.username);
            (0, vitest_1.expect)(user).toEqual(mockUser);
        });
    });
    (0, vitest_1.describe)('getByEmail', () => {
        (0, vitest_1.it)('should get a user by email', async () => {
            user_1.default.findOne.mockResolvedValue(mockUser);
            const user = await (0, userService_1.getByEmail)(mockUser.email);
            (0, vitest_1.expect)(user).toEqual(mockUser);
        });
    });
});
