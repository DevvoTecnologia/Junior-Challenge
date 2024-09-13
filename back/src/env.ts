import z from 'zod';

const envSchema = z.object({
  DB_URL: z.string().url(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  JWT_SECRET_KEY: z.string(),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
});
export const env = envSchema.parse({
  DB_URL: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: process.env.DB_PORT || '5432',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
});
