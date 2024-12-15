// src/controllers/ringController.ts

import { RequestHandler } from 'express';
import { AppDataSource } from '../data-source';
import { Ring } from '../entities/Ring';

export class RingController {
  // Para criar um novo anel (POST /rings)
  static create: RequestHandler = async (req, res) => {
    try {
      const { nome, poder, portador, forjadoPor, imagem } = req.body;

      
      if (!nome || !poder || !portador || !forjadoPor) {
        res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        return;
      }

      const ringRepository = AppDataSource.getRepository(Ring);
      const countRings = await ringRepository.count({ where: { forjadoPor } });

      const maxByForjador: Record<string, number> = {
        'Elfos': 3,
        'Anões': 7,
        'Homens': 9,
        'Sauron': 1
      };

      const maxPermitido = maxByForjador[forjadoPor];

      if (maxPermitido !== undefined && countRings >= maxPermitido) {
        res.status(400).json({ message: `Não é possível criar mais anéis forjados por ${forjadoPor}. Limite atingido!` });
        return;
      }

      const novoAnel = ringRepository.create({
        nome,
        poder,
        portador,
        forjadoPor,
        imagem: imagem || 'https://via.placeholder.com/150'
      });

      await ringRepository.save(novoAnel);

      res.status(201).json(novoAnel);
    } catch (error) {
      console.error('Erro ao criar anel:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  // Listar todos os anéis (GET /rings)
  static list: RequestHandler = async (req, res) => {
    try {
      const ringRepository = AppDataSource.getRepository(Ring);
      const allRings = await ringRepository.find();
      res.status(200).json(allRings);
    } catch (error) {
      console.error('Erro ao listar anéis:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  // Para atualizar um anel (PUT /rings/:id)
  static update: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, poder, portador, forjadoPor, imagem } = req.body;

      const ringRepository = AppDataSource.getRepository(Ring);
      const anel = await ringRepository.findOneBy({ id: Number(id) });

      if (!anel) {
        res.status(404).json({ message: 'Anel não encontrado' });
        return;
      }

      if (nome) anel.nome = nome;
      if (poder) anel.poder = poder;
      if (portador) anel.portador = portador;
      if (forjadoPor) anel.forjadoPor = forjadoPor;
      if (imagem) anel.imagem = imagem;

      await ringRepository.save(anel);
      res.status(200).json(anel);
    } catch (error) {
      console.error('Erro ao atualizar anel:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }

  // Para deletar um anel (DELETE /rings/:id)
  static delete: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const ringRepository = AppDataSource.getRepository(Ring);
      const anel = await ringRepository.findOneBy({ id: Number(id) });

      if (!anel) {
        res.status(404).json({ message: 'Anel não encontrado' });
        return;
      }

      await ringRepository.remove(anel);
      res.status(200).json({ message: 'Anel deletado com sucesso!' });
    } catch (error) {
      console.error('Erro ao deletar anel:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
    
  }
  // PAra buscar um anel por ID (GET /rings/:id)
  static getById: RequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const ringRepository = AppDataSource.getRepository(Ring);
      const anel = await ringRepository.findOneBy({ id: Number(id) });

      if (!anel) {
        res.status(404).json({ message: 'Anel não encontrado' });
        return;
      }

      res.status(200).json(anel);
    } catch (error) {
      console.error('Erro ao buscar anel:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
}
