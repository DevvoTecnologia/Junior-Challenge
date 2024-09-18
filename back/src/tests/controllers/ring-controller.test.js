"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ringController_1 = require("../../controllers/ringController");
const ringService_1 = require("../../services/ringService");
const userService_1 = require("../../services/userService");
vitest_1.vi.mock('../../services/ringService', () => ({
    getRingService: vitest_1.vi.fn(),
    getAllRingsService: vitest_1.vi.fn(),
    createRingService: vitest_1.vi.fn(),
    updateRingService: vitest_1.vi.fn(),
    deleteRingService: vitest_1.vi.fn(),
    getAllRingsByBearerId: vitest_1.vi.fn(),
}));
vitest_1.vi.mock('../../middleware/authMiddleware', () => ({
    authenticate: vitest_1.vi.fn(),
}));
vitest_1.vi.mock('../../services/userService', () => ({
    getById: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('Ring Controller', () => {
    let reply;
    (0, vitest_1.beforeEach)(() => {
        reply = {
            status: vitest_1.vi.fn().mockReturnThis(),
            send: vitest_1.vi.fn(),
            raw: {},
            context: {},
            log: {},
        };
        vitest_1.vi.clearAllMocks();
    });
    const createRequest = (params, body = {}, user) => {
        const request = {
            params,
            body,
            user,
            query: {},
            headers: {},
            raw: {},
            id: '',
            log: {},
            server: {},
            context: {},
        };
        return request;
    };
    (0, vitest_1.describe)('getRing', () => {
        (0, vitest_1.it)('should return a ring by ID', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440000', class: 'Elfo' };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            const mockRing = { id: 1, name: 'Test Ring' };
            ringService_1.getRingService.mockResolvedValue(mockRing);
            await (0, ringController_1.getRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith(mockRing);
        });
        (0, vitest_1.it)('should return 404 if ring not found', async () => {
            const testUser = {
                userId: '550e8400-e29b-41d4-a716-446655440001',
                class: 'Humano',
            };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            ringService_1.getRingService.mockResolvedValue(null);
            await (0, ringController_1.getRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
        });
    });
    (0, vitest_1.describe)('getAllRings', () => {
        (0, vitest_1.it)('should return all rings for authenticated user', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440002', class: 'Anão' };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            const mockRings = [
                { id: 1, name: 'Ring 1', userId: testUser.userId },
                { id: '2', name: 'Ring 2', userId: testUser.userId },
            ];
            ringService_1.getAllRingsService.mockResolvedValue(mockRings);
            await (0, ringController_1.getAllRings)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith(mockRings);
        });
        (0, vitest_1.it)('should return 401 if user is not authenticated', async () => {
            const request = createRequest({ ringId: 1 }, {}, { userId: '', class: '' });
            request.user = undefined;
            await (0, ringController_1.getAllRings)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(401);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({ error: 'User not authenticated' });
        });
    });
    (0, vitest_1.describe)('createRing', () => {
        (0, vitest_1.it)('should create a new ring', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440004', class: 'Elfo' };
            const request = createRequest({ ringId: 1 }, {
                name: 'Test Ring',
                power: 'Invisibility',
                bearer: testUser.userId,
                forgedBy: testUser.userId,
            }, testUser);
            const mockRing = { id: 1, name: 'Test Ring', class: 'Elfo' };
            ringService_1.createRingService.mockResolvedValue(mockRing);
            userService_1.getById.mockResolvedValue(testUser);
            await (0, ringController_1.createRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(201);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith(mockRing);
        });
        (0, vitest_1.it)('should return 401 if user is not authenticated', async () => {
            const request = createRequest({ ringId: 1 }, {}, { userId: '', class: '' });
            request.user = undefined;
            await (0, ringController_1.createRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(401);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({ error: 'User not authenticated' });
        });
    });
    (0, vitest_1.describe)('updateRing', () => {
        (0, vitest_1.it)('should update a ring', async () => {
            const testUser = {
                userId: '550e8400-e29b-41d4-a716-446655440005',
                class: 'Humano',
            };
            const request = createRequest({ ringId: 1 }, {
                name: 'Updated Ring',
                power: 'Updated Power',
                bearer: testUser.userId,
            }, testUser);
            const mockRing = { id: 1, bearer: testUser.userId };
            ringService_1.getRingService.mockResolvedValue(mockRing);
            ringService_1.updateRingService.mockResolvedValue(mockRing);
            await (0, ringController_1.updateRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(200);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith(mockRing);
        });
        (0, vitest_1.it)('should return 404 if ring not found', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440006', class: 'Anão' };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            ringService_1.getRingService.mockResolvedValue(null);
            await (0, ringController_1.updateRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
        });
        (0, vitest_1.it)('should return 403 if user is not authorized', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440007', class: 'Elfo' };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            const mockRing = { id: 1, bearer: 'other-user' };
            ringService_1.getRingService.mockResolvedValue(mockRing);
            await (0, ringController_1.updateRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(403);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({
                error: 'Unauthorized to perform this action',
            });
        });
    });
    (0, vitest_1.describe)('deleteRing', () => {
        (0, vitest_1.it)('should delete a ring', async () => {
            const testUser = {
                userId: '550e8400-e29b-41d4-a716-446655440008',
                class: 'Humano',
            };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            const mockRing = { id: 1, bearer: testUser.userId };
            ringService_1.getRingService.mockResolvedValue(mockRing);
            ringService_1.deleteRingService.mockResolvedValue(undefined);
            await (0, ringController_1.deleteRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(204);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return 404 if ring not found', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440009', class: 'Anão' };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            ringService_1.getRingService.mockResolvedValue(null);
            await (0, ringController_1.deleteRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({ error: 'Ring not found' });
        });
        (0, vitest_1.it)('should return 403 if user is not authorized', async () => {
            const testUser = { userId: '550e8400-e29b-41d4-a716-446655440010', class: 'Elfo' };
            const request = createRequest({ ringId: 1 }, {}, testUser);
            const mockRing = { id: 1, bearer: 'other-user' };
            ringService_1.getRingService.mockResolvedValue(mockRing);
            await (0, ringController_1.deleteRing)(request, reply);
            (0, vitest_1.expect)(reply.status).toHaveBeenCalledWith(403);
            (0, vitest_1.expect)(reply.send).toHaveBeenCalledWith({
                error: 'Unauthorized to perform this action',
            });
        });
    });
});
