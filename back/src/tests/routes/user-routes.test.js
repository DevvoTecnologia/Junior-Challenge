"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const setup_1 = require("../setup");
let app;
let id;
(0, vitest_1.beforeEach)(async () => {
    app = await (0, setup_1.createApp)();
});
(0, vitest_1.afterEach)(async () => {
    vitest_1.vi.resetAllMocks();
    await app.close();
});
const mockUser = {
    username: 'teeeestuserRoutess',
    password: 'password123dasa',
    email: 'testRoutees@examplee.com',
    id: 'mock-id',
    class: 'warrior',
};
(0, vitest_1.describe)('user routes', () => {
    (0, vitest_1.test)('POST /register deve registrar um novo usuário com classe', async () => {
        const newUser = {
            username: mockUser.username,
            email: mockUser.email,
            password: mockUser.password,
            class: mockUser.class,
        };
        const userResponse = await (0, supertest_1.default)(app.server).post('/register').send(newUser);
        id = userResponse.body.id;
        (0, vitest_1.expect)(userResponse.body).toEqual({
            username: mockUser.username,
            email: mockUser.email,
            class: mockUser.class,
            id: vitest_1.expect.any(String),
        });
        (0, vitest_1.expect)(userResponse.status).toBe(201);
    });
    (0, vitest_1.test)('POST /register deve retornar erro 400 para dados inválidos', async () => {
        const response = await (0, supertest_1.default)(app.server).post('/register').send({
            username: 'testeuser',
            email: 'invalid-email',
            password: mockUser.password,
            class: 'warrior',
        });
        (0, vitest_1.expect)(response.status).toBe(400);
    });
    (0, vitest_1.test)('POST /login deve logar um usuário', async () => {
        await (0, supertest_1.default)(app.server).post('/register').send({
            username: mockUser.username,
            email: mockUser.email,
            password: mockUser.password,
            class: mockUser.class,
        });
        const response = await (0, supertest_1.default)(app.server).post('/login').send({
            email: mockUser.email,
            password: mockUser.password,
        });
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body).toEqual({
            token: vitest_1.expect.any(String),
            user: {
                id: vitest_1.expect.any(String),
                username: mockUser.username,
                email: mockUser.email,
                class: mockUser.class,
            },
        });
    });
    (0, vitest_1.test)('DELETE /delete/:id deve deletar um usuário', async () => {
        const userResponse = await (0, supertest_1.default)(app.server).post('/register').send({
            username: mockUser.username,
            email: mockUser.email,
            password: mockUser.password,
            class: mockUser.class,
        });
        const userId = userResponse.body.id;
        const response = await (0, supertest_1.default)(app.server).delete(`/delete/${userId}`);
        (0, vitest_1.expect)(response.status).toBe(204);
        (0, vitest_1.expect)(response.body).toEqual({});
    });
    (0, vitest_1.test)('DELETE /delete/:id deve retornar erro 404 para usuário inexistente', async () => {
        const response = await (0, supertest_1.default)(app.server).delete('/delete/00000000-0000-0000-0000-000300003000');
        (0, vitest_1.expect)(response.status).toBe(404);
        (0, vitest_1.expect)(response.body).toEqual({
            error: 'User not found',
        });
    });
});
