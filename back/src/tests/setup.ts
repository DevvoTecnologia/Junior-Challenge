import fastify, { FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { userRoutes } from '../routes/userRoutes';
import { ringRoutes } from '../routes/ringRoutes';
import sequelize from '../models';

export const createApp = async (): Promise<FastifyInstance> => {
  const app = fastify();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(userRoutes);
  await app.register(ringRoutes, { prefix: '/rings' });

  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  await app.ready();

  return app;
};
