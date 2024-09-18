"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const userRoutes_1 = require("../routes/userRoutes");
const ringRoutes_1 = require("../routes/ringRoutes");
const models_1 = __importDefault(require("../models"));
const createApp = async () => {
    const app = (0, fastify_1.default)();
    app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
    app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
    app.register(userRoutes_1.userRoutes);
    await app.register(ringRoutes_1.ringRoutes, { prefix: '/rings' });
    await models_1.default.authenticate();
    await models_1.default.sync({ force: true });
    await app.ready();
    return app;
};
exports.createApp = createApp;
