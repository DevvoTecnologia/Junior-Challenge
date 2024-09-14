import { Request, Response } from 'express';
import { AnelService } from '../services/ring.service';
import { SequelizeAnelRepository } from '../repositories/ring.repository';

const anelService = new AnelService(new SequelizeAnelRepository());

export const criarAnel = async (req: Request, res: Response) => {
  try {
    const { nome, poder, portador, forjadoPor, imagem } = req.body;

    const anel = await anelService.createAnel({ nome, poder, portador, forjadoPor, imagem });
    return res.status(201).json(anel);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

export const listarAneis = async (_req: Request, res: Response) => {
  try {
    const aneis = await anelService.listAllAnel();
    return res.status(200).json(aneis);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: 'Erro ao listar anéis' });
    }
    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

export const atualizarAnel = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10); 
    const { nome, poder, portador, forjadoPor, imagem } = req.body;

    const anel = await anelService.updateAnel(id, { nome, poder, portador, forjadoPor, imagem });
    return res.status(200).json(anel);
  } catch (error) {
    if (error instanceof Error && error.message === 'Anel não encontrado') {
      return res.status(404).json({ message: 'Anel não encontrado' });
    }
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};

export const deletarAnel = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    await anelService.deleteAnel(id);
    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === 'Anel não encontrado') {
      return res.status(404).json({ message: 'Anel não encontrado' });
    }
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Erro desconhecido' });
  }
};
