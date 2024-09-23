import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCustomerService } from '../services/DeleteCustomerService';

class DeleteCustomerController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const customerService = new DeleteCustomerService();

        try {
            await customerService.excute({ id });
            reply.status(204).send();
        } catch (error) {
            console.error(error);
            reply.status(500).send("Erro ao deletar o anel.");
        }
    }
}

export { DeleteCustomerController };
