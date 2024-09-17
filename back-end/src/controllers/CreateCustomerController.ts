import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from '../services/CreateCustomerService';

class CreateCustomerController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { imageURL, name, power, carrier, forger, info } = request.body as { imageURL: string, name: string, power: string, carrier: string, forger: string, info: string };

        const customerService = new CreateCustomerService();
        const customer = await customerService.execute({ imageURL, name, power, carrier, forger, info });

        reply.send(customer);
    }
}

export { CreateCustomerController }