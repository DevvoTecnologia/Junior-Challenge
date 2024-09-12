import fastifyCors from '@fastify/cors';
import { userRoutes } from './routes/userRoutes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { app } from './app';
import { ringRoutes } from './routes/ringRoutes';
import { env } from 'process';
import sequelize from './models';

const port = env.PORT || 3000;

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json', 'multipart/form-data'],
    produces: ['application/json'],
    info: {
      title: 'Anéis de Poder API',
      description: 'Especificações da API para o sistema Anéis de Poder.',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes);
app.register(ringRoutes, { prefix: '/rings' });

// app.register(sequelizeFastify, {
//   instance: 'db',
//   sequelizeOptions: {
//     dialect: 'postgres',
//     database: 'DB_NAME',
//     username: 'DB_USER_NAME',
//     password: 'DB_USER_PASSWORD',
//     host: 'DB_HOST_OR_SERVER',
//     port: 3000,
//   },
// });

app.listen({ host: '0.0.0.0', port: Number(port) }, (error: any, address: string) => {
  if (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
  (async () => {
    try {
      // await sequelize.authenticate();
      // console.log('SEQUELIZE: DB CONNECTION SUCCESSFUL');

      await sequelize.sync();
      console.log('SEQUELIZE: sync successful');
    } catch (error) {
      console.error('SEQUELIZE: DB CONNECTION ERROR:', error);
    }
  })();
  console.log(`Server listening at ${port}`);
});
