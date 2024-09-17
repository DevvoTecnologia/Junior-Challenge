import z from "zod";

const envSchema = z.object({
  API_PORT: z.string(),
  TYPEORM_CONNECTION: z.string(),
  TYPEORM_HOST: z.string(),
  TYPEORM_USER: z.string(),
  TYPEORM_PASSWORD: z.string(),
  TYPEORM_DATABASE: z.string(),
  TYPEORM_PORT: z.string(),
  MAIL_USER: z.string(),
  MAIL_PASSWORD: z.string(),
  MONGO_URI: z.string(),
  MONGO_DB: z.string(),
  MONGO_TABLE: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)