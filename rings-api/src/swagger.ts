import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Router } from 'express'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API dos Anéis de Poder',
      version: '1.0.0',
      description: 'Documentação da API para gerenciar anéis',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

const swaggerRouter = Router()
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default swaggerRouter
