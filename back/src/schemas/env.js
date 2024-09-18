"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = __importDefault(require("zod"));
const envSchema = zod_1.default.object({
    DATABASE_URL: zod_1.default.string().url(),
    DATABASE_USER: zod_1.default.string(),
    DATABASE_PASSWORD: zod_1.default.string(),
    DATABASE_NAME: zod_1.default.string(),
    DATABASE_HOST: zod_1.default.string(),
    DATABASE_PORT: zod_1.default.string().regex(/^\d+$/).transform(Number),
});
exports.env = envSchema.parse(process.env);
