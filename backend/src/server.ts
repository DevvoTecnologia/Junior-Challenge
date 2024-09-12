import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

const comecar = async () => {
    
    await app.register(cors)
    await app.register(routes)

  try {
    await app.listen({ port: 3434 });
  } catch (error) {
    process.exit(1)
  }
};

comecar()