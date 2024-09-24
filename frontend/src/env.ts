import { z } from 'zod'

export const envSchema = z.object({
  VITE_API_BASEURL: z.string(),
})

export const env = envSchema.parse(import.meta.env)