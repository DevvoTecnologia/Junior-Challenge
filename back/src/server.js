"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const userRoutes_1 = require("./routes/userRoutes");
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
const app_1 = require("./app");
const ringRoutes_1 = require("./routes/ringRoutes");
const process_1 = require("process");
const models_1 = __importDefault(require("./models"));
const port = process_1.env.PORT || 3000;
app_1.app.register(cors_1.default, {
    origin: '*',
});
app_1.app.register(swagger_1.default, {
    swagger: {
        consumes: ['application/json', 'multipart/form-data'],
        produces: ['application/json'],
        info: {
            title: 'Anéis de Poder API',
            description: 'Especificações da API para o sistema Anéis de Poder.',
            version: '1.0.0',
        },
    },
    transform: fastify_type_provider_zod_1.jsonSchemaTransform,
});
app_1.app.register(swagger_ui_1.default, {
    routePrefix: '/docs',
});
app_1.app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app_1.app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app_1.app.register(userRoutes_1.userRoutes);
app_1.app.register(ringRoutes_1.ringRoutes, { prefix: '/rings' });
app_1.app.listen({ host: '0.0.0.0', port: Number(port) }, async (error) => {
    if (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
    try {
        await models_1.default.authenticate();
        await models_1.default.sync();
    }
    catch (error) {
        console.error('SEQUELIZE DB CONNECTION ERROR:', error);
    }
    console.log(`Server listening at ${port}`);
});
