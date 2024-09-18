"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ringRoutes = ringRoutes;
const zod_1 = __importDefault(require("zod"));
const ringController_1 = require("../controllers/ringController");
const authMiddleware_1 = require("../middleware/authMiddleware");
async function ringRoutes(fastify) {
    fastify.addHook('onRequest', authMiddleware_1.authenticate);
    fastify.post('/', {
        schema: {
            summary: 'Create a new ring',
            description: 'This endpoint allows a user to create a new ring.',
            tags: ['Rings'],
            body: zod_1.default.object({
                name: zod_1.default.string().max(16, 'Name must be less than 16 characters'),
                power: zod_1.default
                    .string()
                    .max(1000, 'Power description must be less than 1000 characters'),
                bearer: zod_1.default.string().uuid(),
                forgedBy: zod_1.default.string(),
                image: zod_1.default.string().url(),
            }),
            response: {
                201: zod_1.default.object({
                    id: zod_1.default.number(),
                    name: zod_1.default.string(),
                    power: zod_1.default.string(),
                    bearer: zod_1.default.string().uuid(),
                    forgedBy: zod_1.default.string(),
                    image: zod_1.default.string().url(),
                    createdAt: zod_1.default.date(),
                    updatedAt: zod_1.default.date(),
                }),
                400: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, ringController_1.createRing);
    fastify.put('/:ringId', {
        schema: {
            summary: 'Update ring',
            tags: ['Rings'],
            body: zod_1.default.object({
                name: zod_1.default.string().max(16, 'Name must be less than 16 characters').optional(),
                power: zod_1.default
                    .string()
                    .max(1000, 'Power description must be less than 1000 characters')
                    .optional(),
                bearer: zod_1.default.string().uuid().optional(),
                forgedBy: zod_1.default.string().optional(),
                image: zod_1.default.string().url().optional(),
            }),
            params: zod_1.default.object({
                ringId: zod_1.default.string().transform(Number),
            }),
            response: {
                200: zod_1.default.object({
                    id: zod_1.default.number(),
                    name: zod_1.default.string(),
                    power: zod_1.default.string(),
                    bearer: zod_1.default.string().uuid(),
                    forgedBy: zod_1.default.string(),
                    image: zod_1.default.string().url(),
                    createdAt: zod_1.default.date(),
                    updatedAt: zod_1.default.date(),
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
    }, ringController_1.updateRing);
    fastify.get('/:ringId', {
        schema: {
            summary: 'Get ring by id',
            tags: ['Rings'],
            params: zod_1.default.object({
                ringId: zod_1.default.string().transform(Number),
            }),
            response: {
                200: zod_1.default.object({
                    id: zod_1.default.number(),
                    name: zod_1.default.string(),
                    power: zod_1.default.string(),
                    bearer: zod_1.default.string().uuid(),
                    forgedBy: zod_1.default.string(),
                    image: zod_1.default.string().url(),
                    createdAt: zod_1.default.date(),
                    updatedAt: zod_1.default.date(),
                }),
                404: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, ringController_1.getRing);
    fastify.get('/', {
        schema: {
            summary: 'Get all rings',
            tags: ['Rings'],
            response: {
                200: zod_1.default.array(zod_1.default.object({
                    id: zod_1.default.number(),
                    name: zod_1.default.string(),
                    power: zod_1.default.string(),
                    bearer: zod_1.default.string().uuid(),
                    forgedBy: zod_1.default.string(),
                    image: zod_1.default.string().url(),
                    createdAt: zod_1.default.date(),
                    updatedAt: zod_1.default.date(),
                })),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, ringController_1.getAllRings);
    fastify.delete('/:ringId', {
        schema: {
            summary: 'Delete ring',
            tags: ['Rings'],
            params: zod_1.default.object({
                ringId: zod_1.default.string().transform(Number),
            }),
            response: {
                204: zod_1.default.object({}),
                404: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
                500: zod_1.default.object({
                    error: zod_1.default.string(),
                }),
            },
        },
    }, ringController_1.deleteRing);
}
