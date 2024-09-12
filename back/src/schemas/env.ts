import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string().regex(/^\d+$/).transform(Number),
});

export const env = envSchema.parse(process.env);
