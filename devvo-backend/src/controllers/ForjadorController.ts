import { Request, Response } from 'express';
import { ForjadorRepository } from '../repositories/ForjadorRepository';

export class ForjadorController {
  private forjadorRepository = new ForjadorRepository();

  public async getAllForjadores(req: Request, res: Response): Promise<Response> {
    try {
      const forjadores = await this.forjadorRepository.getAllForjadores(); // Verifique se o método está funcionando
      return res.json(forjadores); // Enviando os dados ao frontend
    } catch (error) {
      console.error('Erro ao buscar forjadores:', error);
      return res.status(500).json({ error: 'Erro ao buscar forjadores' });
    }
  }
}
