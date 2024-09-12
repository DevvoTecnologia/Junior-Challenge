import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    DB_HOST: z.string(),
    DB_PORT: z.string().transform(Number),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Variaveis de ambiente invalidas!:', parsedEnv.error.format());
    process.exit(1);
}

export const env = parsedEnv.data;
