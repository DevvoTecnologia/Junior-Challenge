import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.string().default("3000"),
});

export const env = envSchema.parse(process.env);
