import { z } from "zod"
import "dotenv/config"

const schemaEnv = z.object({
  NODE_ENV: z.enum(["dev", "prod", "test"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  DATABASE_TYPE: z.enum(["mysql", "postgres", "mongodb"]),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
})

const _env = schemaEnv.safeParse(process.env)

if (_env.success === false) {
  console.error("Error: environment variables not passed correctly", _env.error.format())

  throw new Error()
}

export const env = _env.data
