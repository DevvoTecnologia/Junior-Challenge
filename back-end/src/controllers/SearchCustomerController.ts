// controllers/SearchCustomerController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { SurchCustomerService } from '../services/SearchCustomerService'; // Atualize o nome do serviço se necessário

class SearchCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name } = request.query as { name: string }; // Recebe o nome da query

    const customerService = new SurchCustomerService();

    try {
      // Verifique se o anel existe
      const existingAnel = await customerService.findByName(name);

      if (!existingAnel) {
        return reply.status(404).send({ message: 'Anel não encontrado.' });
      }

      reply.send(existingAnel);
    } catch (error: unknown) {
      if (error instanceof Error) {
        reply.status(500).send({ message: error.message || 'Erro ao buscar o anel.' });
      } else {
        reply.status(500).send({ message: 'Erro desconhecido ao buscar o anel.' });
      }
    }
  }
}

export { SearchCustomerController };
