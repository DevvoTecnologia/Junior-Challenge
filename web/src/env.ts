import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  VITE_API_BASE_URL: z.string().default('http://localhost:5000'),
})

export const env = envSchema.parse(import.meta.env)
