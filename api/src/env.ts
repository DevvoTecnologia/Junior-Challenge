import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_NAME: z.string().default('ArtifactHub'),
  SERVER_PORT: z.coerce.number().default(5000),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5433),
  DB_USERNAME: z.string().default('gustavo'),
  DB_PASSWORD: z.string().default('1234'),
  DB_NAME: z.string().default('artifact-hub'),
  CLOUD_NAME: z.string(),
  CLOUD_API_KEY: z.string(),
  CLOUD_API_SECRET: z.string(),
  HUGGING_FACE_TOKEN: z.string(),
})

export const env = envSchema.parse(process.env)
