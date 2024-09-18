"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = userRoutes;
const zod_1 = __importDefault(require("zod"));
const userController_1 = require("../controllers/userController");
async function userRoutes(app) {
    app.withTypeProvider().post('/register', {
        schema: {
            summary: 'Register a new user',
            description: 'This endpoint allows a new user to register.',
            tags: ['Users'],
            body: zod_1.default.object({
                username: zod_1.default.string().min(3, 'Username must be at least 3 characters long'),
                email: zod_1.default.string().email('Invalid email address'),
                password: zod_1.default.string().min(6, 'Password must be at least 6 characters long'),
                class: zod_1.default.string().min(3, 'Username must be at least 3 characters long'),
            }),
            response: {
                201: zod_1.default.object({
                    id: zod_1.default.string().uuid(),
                    username: zod_1.default.string(),
                    email: zod_1.default.string(),
                    class: zod_1.default.string().optional(),
                }),
                400: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, userController_1.registerUser);
    app.withTypeProvider().post('/login', {
        schema: {
            summary: 'Login a user',
            description: 'This endpoint allows an existing user to login.',
            tags: ['Users'],
            body: zod_1.default.object({
                email: zod_1.default.string().email('Invalid email address'),
                password: zod_1.default.string().min(6, 'Password must be at least 6 characters long'),
            }),
            response: {
                200: zod_1.default.object({
                    token: zod_1.default.string(),
                    user: zod_1.default.object({
                        id: zod_1.default.string().uuid(),
                        username: zod_1.default.string(),
                        email: zod_1.default.string(),
                        class: zod_1.default.string(),
                    }),
                }),
                400: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                401: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, userController_1.loginUser);
    app.withTypeProvider().delete('/delete/:id', {
        schema: {
            summary: 'Delete a user',
            description: 'This endpoint allows an admin to delete a user by ID.',
            tags: ['Users'],
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
            response: {
                200: zod_1.default.object({
                    id: zod_1.default.string().uuid(),
                    username: zod_1.default.string(),
                    email: zod_1.default.string(),
                }),
                400: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                404: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, userController_1.deleteUser);
    app.withTypeProvider().get('/:id', {
        schema: {
            summary: 'get user',
            description: 'Get User.',
            tags: ['Users'],
            params: zod_1.default.object({
                id: zod_1.default.string(),
            }),
            response: {
                200: zod_1.default.object({
                    id: zod_1.default.string(),
                    username: zod_1.default.string(),
                    email: zod_1.default.string(),
                    class: zod_1.default.string(),
                }),
                400: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                404: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, userController_1.getUser);
}
