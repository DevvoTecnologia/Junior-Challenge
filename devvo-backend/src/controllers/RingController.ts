import { Request, Response } from "express";
import { RingService } from "../services/RingService";
import { AppError } from "../shared/errors/AppError";

const ringService = new RingService();

export class RingController {
    private ringService: RingService;

    constructor() {
      this.ringService = new RingService();
    }
  
    // Função para criar um anel
    async create(req: Request, res: Response): Promise<Response> {
        try {
          const { nome, poder, portadorNome, forjadoPorId, imagem } = req.body;
          const newRing = await this.ringService.createRing({ nome, poder, portadorNome, forjadoPorId, imagem });
          return res.status(201).json(newRing);
        } catch (error) {
          const err = error as Error; // Convertendo o erro para tipo Error
          return res.status(400).json({ error: err.message });
        }
      }
  
    // Função para listar todos os anéis
    async getAll(req: Request, res: Response): Promise<Response> {
      try {
        const rings = await this.ringService.getRings(); // Chamando o método getRings do serviço
        return res.status(200).json(rings);
      } catch (error) {
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
    }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedRing = await ringService.updateRing(Number(id), updateData);
      return res.json(updatedRing);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro desconhecido" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await ringService.deleteRing(Number(id));
      return res.status(200).json({ message: "Anel deletado com sucesso" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: "Erro desconhecido" });
    }
  }
}
