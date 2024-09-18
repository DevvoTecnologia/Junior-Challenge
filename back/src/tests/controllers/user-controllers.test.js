"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const userController_1 = require("../../controllers/userController");
const userService_1 = require("../../services/userService");
vitest_1.vi.mock('../../services/userService');
(0, vitest_1.describe)('UserController', async () => {
    let mockReply;
    (0, vitest_1.beforeEach)(() => {
        mockReply = {
            status: vitest_1.vi.fn().mockReturnThis(),
            send: vitest_1.vi.fn(),
        };
        vitest_1.vi.clearAllMocks();
    });
    const mockUser = {
        username: 'testuserController',
        password: 'teste123',
        email: 'testController@example.com',
        id: 'mock-id',
        class: 'mock-class',
    };
    (0, vitest_1.describe)('registerUser', () => {
        (0, vitest_1.it)('should register a new user successfully', async () => {
            userService_1.getByUsername.mockResolvedValue(null);
            userService_1.createUserService.mockResolvedValue(mockUser);
            const mockRequest = {
                body: {
                    username: mockUser.username,
                    email: mockUser.email,
                    password: mockUser.password,
                    class: mockUser.class,
                },
            };
            await (0, userController_1.registerUser)(mockRequest, mockReply);
            (0, vitest_1.expect)(userService_1.getByUsername).toHaveBeenCalledWith(mockUser.username);
            (0, vitest_1.expect)(userService_1.createUserService).toHaveBeenCalledWith({
                email: mockUser.email,
                password: mockUser.password,
                username: mockUser.username,
                class: mockUser.class,
            });
            (0, vitest_1.expect)(mockReply.status).toHaveBeenCalledWith(201);
            (0, vitest_1.expect)(mockReply.send).toHaveBeenCalledWith({
                email: mockUser.email,
                id: mockUser.id,
                username: mockUser.username,
                class: mockUser.class,
            });
        });
        (0, vitest_1.it)('should return 500 if user already exists', async () => {
            userService_1.getByUsername.mockResolvedValue(mockUser);
            const mockRequest = {
                body: mockUser,
            };
            await (0, userController_1.registerUser)(mockRequest, mockReply);
            (0, vitest_1.expect)(mockReply.status).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockReply.send).toHaveBeenCalledWith(vitest_1.expect.any(Error));
        });
    });
    (0, vitest_1.describe)('loginUser', () => {
        (0, vitest_1.it)('should login a user successfully', async () => {
            userService_1.loginUserService.mockResolvedValue({
                token: 'mock-token',
                user: mockUser,
            });
            const mockRequest = {
                body: {
                    email: mockUser.email,
                    password: mockUser.password,
                },
            };
            await (0, userController_1.loginUser)(mockRequest, mockReply);
            (0, vitest_1.expect)(userService_1.loginUserService).toHaveBeenCalledWith({
                email: mockUser.email,
                password: mockUser.password,
            });
            (0, vitest_1.expect)(mockReply.status).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(mockReply.send).toHaveBeenCalledWith({
                token: 'mock-token',
                user: mockUser,
            });
        });
        (0, vitest_1.it)('should return 500 on login service failure', async () => {
            userService_1.loginUserService.mockRejectedValue(new Error('Login failed'));
            const mockRequest = {
                body: {
                    email: mockUser.email,
                    password: mockUser.password,
                },
            };
            await (0, userController_1.loginUser)(mockRequest, mockReply);
            (0, vitest_1.expect)(mockReply.status).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockReply.send).toHaveBeenCalledWith(vitest_1.expect.any(Error));
        });
    });
    (0, vitest_1.describe)('deleteUser', () => {
        (0, vitest_1.it)('should delete a user successfully', async () => {
            const id = 'mock-id';
            userService_1.getById.mockResolvedValue({ id });
            userService_1.deleteUserService.mockResolvedValue(undefined);
            const mockRequest = {
                params: {
                    id,
                },
            };
            await (0, userController_1.deleteUser)(mockRequest, mockReply);
            (0, vitest_1.expect)(mockReply.status).toHaveBeenCalledWith(204);
            (0, vitest_1.expect)(mockReply.send).toHaveBeenCalledWith();
        });
        (0, vitest_1.it)('should return 404 if user is not found', async () => {
            const id = 'mock-id';
            userService_1.getById.mockResolvedValue(null);
            const mockRequest = {
                params: {
                    id,
                },
            };
            await (0, userController_1.deleteUser)(mockRequest, mockReply);
            (0, vitest_1.expect)(mockReply.status).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(mockReply.send).toHaveBeenCalledWith({ error: 'User not found' });
        });
    });
});
