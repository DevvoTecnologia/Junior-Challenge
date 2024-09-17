// controllers/UpdateCustomerController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { UpdateCustomerService } from '../services/UpdateCustomerService';

class UpdateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { imageURL, power, carrier, forger, info } = request.body as { imageURL?: string, power?: string, carrier?: string, forger?: string, info?: string };

    const customerService = new UpdateCustomerService();

    try {
      // Verifique se o anel existe
      const existingAnel = await customerService.findById(id);

      if (!existingAnel) {
        return reply.status(404).send({ message: 'Anel não encontrado.' });
      }

      // Atualize o anel
      const updatedAnel = await customerService.update(id, { imageURL, power, carrier, forger, info });

      reply.send(updatedAnel);
    } catch (error) {
      reply.status(500).send({ message: 'Erro ao atualizar o anel.' });
    }
  }
}

export { UpdateCustomerController };
