import z from 'zod';

// Define o esquema para as variáveis de ambiente
const envSchema = z.object({
  DB_URL: z.string().url(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
});

// Faz a validação das variáveis de ambiente
export const env = envSchema.parse({
  DB_URL: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: process.env.DB_PORT || '5432',
});
