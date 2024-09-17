import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerController } from './controllers/CreateCustomerController';
import { ListeCustomerController } from './controllers/ListeCustomerController';
import { DeleteCustomerController } from './controllers/DeleteCustomerController';
import { UpdateCustomerController } from './controllers/UpdateCustomerController';
import { SearchCustomerController } from './controllers/SearchCustomerController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Rota para criar um anel
    fastify.post("/createrings", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply);
    });

    // Rota para listar todos os anéis
    fastify.get("/allrings", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListeCustomerController().handle(request, reply);
    });

    // Rota para buscar um anel por nome
    fastify.get("/createrings/search", async (request: FastifyRequest, reply: FastifyReply) => {
        return new SearchCustomerController().handle(request, reply);
    });

    // Rota para deletar um anel por ID
    fastify.delete("/deleterings/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply);
    });

    // Rota para atualizar um anel por ID
    fastify.put("/updaterings/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateCustomerController().handle(request, reply);
    });
}
