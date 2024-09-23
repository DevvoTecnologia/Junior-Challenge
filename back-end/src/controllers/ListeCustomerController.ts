import { FastifyRequest, FastifyReply } from "fastify";
import { ListeCustomerService } from "../services/ListeCustomerServices";

class ListeCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const listeCustomerService = new ListeCustomerService();

        const customers = await listeCustomerService.execute();

        reply.send(customers);
    }
}

export { ListeCustomerController }