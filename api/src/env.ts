import { z } from 'zod'

const stringToBoolean = (value: string): boolean =>
  value.toLowerCase() === 'true'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  APP_NAME: z.string().default('ArtifactHub'),
  PORT: z.coerce.number().default(5000),
  HOST: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5433),
  DB_USERNAME: z.string().default('gustavo'),
  DB_PASSWORD: z.string().default('1234'),
  DB_NAME: z.string().default('artifact-hub'),
  DB_SSL: z.string().transform(stringToBoolean).default('true'),
  DB_SYNCHRONIZE: z.string().transform(stringToBoolean).default('true'),
  CLOUD_NAME: z.string(),
  CLOUD_API_KEY: z.string(),
  CLOUD_API_SECRET: z.string(),
  HUGGING_FACE_TOKEN: z.string(),
  CORS_ORIGIN: z.string(),
})

export const env = envSchema.parse(process.env)
