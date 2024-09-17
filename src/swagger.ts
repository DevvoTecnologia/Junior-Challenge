import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import * as fs from 'fs';
import * as path from 'path';

export const setupSwagger = (app: Application) => {
  const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../dist/swagger.json'), 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};