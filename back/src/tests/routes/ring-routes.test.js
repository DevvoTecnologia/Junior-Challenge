"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const authUtils_1 = require("../../utils/authUtils");
const user_1 = __importDefault(require("../../models/user"));
const ring_1 = __importDefault(require("../../models/ring"));
const setup_1 = require("../setup");
vitest_1.vi.mock('../services/ringService');
let TOKEN;
let app;
let ringId;
let userId;
(0, vitest_1.describe)('Ring Routes', () => {
    (0, vitest_1.beforeEach)(async () => {
        app = await (0, setup_1.createApp)();
        const mockUser = {
            id: 'd590641f-9976-4928-ba25-e1e0e2f66da8',
            username: 'testRingRoutes',
            password: 'password123',
            email: 'testRingRoutes@example.com',
            class: 'Elfo',
        };
        const user = await user_1.default.create(mockUser);
        userId = user.id;
        TOKEN = (0, authUtils_1.generateToken)(userId);
        const mockRing = {
            name: 'Initial Ring',
            power: 'Invisibility',
            bearer: userId,
            forgedBy: userId,
        };
        const ring = await ring_1.default.create(mockRing);
        ringId = ring.id;
    });
    (0, vitest_1.afterEach)(async () => {
        vitest_1.vi.resetAllMocks();
        await app.close();
    });
    (0, vitest_1.describe)('POST /rings', () => {
        (0, vitest_1.it)('should create a new ring', async () => {
            const newRing = {
                name: 'Test Ring',
                power: 'Invisibility',
                bearer: userId,
                forgedBy: userId,
                image: 'http://example.com/ring.png',
            };
            const response = await (0, supertest_1.default)(app.server)
                .post('/rings')
                .set({ Authorization: `Bearer ${TOKEN}` })
                .send(newRing);
            (0, vitest_1.expect)(response.status).toBe(201);
            (0, vitest_1.expect)(response.body).toEqual({
                id: vitest_1.expect.any(Number),
                name: newRing.name,
                power: newRing.power,
                bearer: newRing.bearer,
                forgedBy: userId,
                image: newRing.image,
                createdAt: vitest_1.expect.any(String),
                updatedAt: vitest_1.expect.any(String),
            });
            ringId = response.body.id;
        });
        (0, vitest_1.it)('should return 400 for invalid data', async () => {
            const invalidRing = {
                name: '',
                power: 'Some power',
            };
            const response = await (0, supertest_1.default)(app.server)
                .post('/rings')
                .set({ Authorization: `Bearer ${TOKEN}` })
                .send(invalidRing);
            (0, vitest_1.expect)(response.status).toBe(400);
        });
        (0, vitest_1.it)('should return 401 if unauthorized', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .post('/rings')
                .set({ Authorization: `Bearer invalidToken` })
                .send({ name: 'Test Ring', power: 'Invisibility', bearer: userId });
            (0, vitest_1.expect)(response.status).toBe(401);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Token Unauthorized' });
        });
    });
    (0, vitest_1.describe)('PUT /rings/:id', () => {
        (0, vitest_1.it)('should update an existing ring', async () => {
            const updatedRing = {
                name: 'Updated Ring',
                power: 'Teleportation',
                bearer: userId,
                image: 'http://example.com/updated_ring.png',
            };
            const response = await (0, supertest_1.default)(app.server)
                .put(`/rings/${ringId}`)
                .set({ Authorization: `Bearer ${TOKEN}` })
                .send(updatedRing);
            (0, vitest_1.expect)(response.status).toBe(200);
            (0, vitest_1.expect)(response.body).toEqual({
                id: ringId,
                name: updatedRing.name,
                power: updatedRing.power,
                bearer: userId,
                forgedBy: userId,
                image: updatedRing.image,
                createdAt: vitest_1.expect.any(String),
                updatedAt: vitest_1.expect.any(String),
            });
        });
        (0, vitest_1.it)('should return 404 if ring not found', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .put('/rings/99999999')
                .set({ Authorization: `Bearer ${TOKEN}` })
                .send({ name: 'Updated Ring', power: 'New Power' });
            (0, vitest_1.expect)(response.status).toBe(404);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Ring not found' });
        });
    });
    (0, vitest_1.describe)('GET /rings/:id', () => {
        (0, vitest_1.it)('should get a ring by id', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .get(`/rings/${ringId}`)
                .set({ Authorization: `Bearer ${TOKEN}` });
            (0, vitest_1.expect)(response.status).toBe(200);
            (0, vitest_1.expect)(response.body).toEqual({
                id: ringId,
                name: 'Initial Ring',
                power: 'Invisibility',
                bearer: userId,
                forgedBy: userId,
                image: null,
                createdAt: vitest_1.expect.any(String),
                updatedAt: vitest_1.expect.any(String),
            });
        });
        (0, vitest_1.it)('should return 404 if ring not found', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .get('/rings/99999999')
                .set({ Authorization: `Bearer ${TOKEN}` });
            (0, vitest_1.expect)(response.status).toBe(404);
            (0, vitest_1.expect)(response.body).toEqual({
                error: 'Ring not found',
            });
        });
    });
    (0, vitest_1.describe)('GET /rings', () => {
        (0, vitest_1.it)('should return all rings', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .get('/rings')
                .set({ Authorization: `Bearer ${TOKEN}` });
            (0, vitest_1.expect)(response.status).toBe(200);
            (0, vitest_1.expect)(response.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    id: ringId,
                    name: 'Initial Ring',
                    power: 'Invisibility',
                    bearer: userId,
                    forgedBy: userId,
                    image: null,
                }),
            ]));
        });
        (0, vitest_1.it)('should return 401 if unauthorized', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .get('/rings')
                .set({ Authorization: `Bearer invalidToken` });
            (0, vitest_1.expect)(response.status).toBe(401);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Token Unauthorized' });
        });
    });
    (0, vitest_1.describe)('DELETE /rings/:id', () => {
        (0, vitest_1.it)('should delete an existing ring', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .delete(`/rings/${ringId}`)
                .set({ Authorization: `Bearer ${TOKEN}` });
            (0, vitest_1.expect)(response.status).toBe(204);
            (0, vitest_1.expect)(response.body).toEqual({});
        });
        (0, vitest_1.it)('should return 404 if ring not found', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .delete('/rings/99999999')
                .set({ Authorization: `Bearer ${TOKEN}` });
            (0, vitest_1.expect)(response.status).toBe(404);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Ring not found' });
        });
        (0, vitest_1.it)('should return 401 if unauthorized', async () => {
            const response = await (0, supertest_1.default)(app.server)
                .delete(`/rings/${ringId}`)
                .set({ Authorization: `Bearer invalidToken` });
            (0, vitest_1.expect)(response.status).toBe(401);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Token Unauthorized' });
        });
    });
});
