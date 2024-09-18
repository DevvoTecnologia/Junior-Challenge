import z from 'zod';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

const envFile = process.env.NODE_ENV === 'test' ? '.testing.env' : '.env';
dotenv.config({ path: resolve(__dirname, envFile) });

const envSchema = z.object({
  DB_URL: z.string().url(),
  DB_USER: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  DB_PORT: z.string().regex(/^\d+$/).transform(Number),
  JWT_SECRET_KEY: z.string().nonempty(),
});

export const env = envSchema.parse({
  DB_URL: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || '',
  DB_HOST: process.env.DB_HOST || '',
  DB_PORT: process.env.DB_PORT || '5432',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',
});
