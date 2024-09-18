"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    DB_URL: zod_1.default.string().url(),
    DB_USER: zod_1.default.string(),
    DB_PASSWORD: zod_1.default.string(),
    DB_NAME: zod_1.default.string(),
    DB_HOST: zod_1.default.string(),
    JWT_SECRET_KEY: zod_1.default.string(),
    DB_PORT: zod_1.default.string().regex(/^\d+$/).transform(Number),
});
exports.env = envSchema.parse({
    DB_URL: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
    DB_USER: process.env.DB_USER || '',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_HOST: process.env.DB_HOST || '',
    DB_PORT: process.env.DB_PORT || '5432',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
});
