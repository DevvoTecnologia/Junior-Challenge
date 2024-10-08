import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {

  reply.code(400).send({message: error.message})

})

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