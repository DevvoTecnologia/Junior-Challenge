import { Request, Response } from 'express';

const AnelService = require('../services/anelService');

exports.createAnel = async (req: Request, res: Response) => {
  try {
    const anelData = {
      nome: req.body.nome,
      poder: req.body.poder,
      portador: req.body.portador,
      forjadoPor: req.body.forjadoPor,
      imagem_url: req.body.imagem_url,
    };

    const createdAnel = await AnelService.createAnel(anelData);
    const populatedAnel = await createdAnel.populate('portador');
    res.status(201).json({
      message: 'Anel criado com sucesso!',
      data: populatedAnel,
    });
  } catch (error) {
    console.error('Erro ao criar anel:', error);
    res.status(500).send('Erro ao criar anel');
  }
};

exports.listarAneis = async (req: Request, res: Response) => {
  try {
    const aneis = await AnelService.listarAneis();
    res.status(200).json(aneis);
  } catch (error) {
    console.error('Erro ao listar aneis:', error);
    res.status(500).send('Erro ao listar aneis');
  }
};

exports.updateAnel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const anelData = {
      nome: req.body.nome,
      poder: req.body.poder,
      portador: req.body.portador,
      forjadoPor: req.body.forjadoPor,
      imagem_url: req.body.imagem_url,
    };

    const updatedAnel = await AnelService.updateAnel(id, anelData);
    await updatedAnel.populate('portador');

    if (!updatedAnel) {
      return res.status(404).send('Anel não encontrado');
    }

    res.status(200).json({
      message: 'Anel atualizado com sucesso!',
      data: updatedAnel,
    });
  } catch (error) {
    console.error('Erro ao atualizar anel:', error);
    res.status(500).send('Erro ao atualizar anel');
  }
};

exports.deleteAnel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedAnel = await AnelService.deleteAnel(id);

    if (!deletedAnel) {
      return res.status(404).send('Anel não encontrado');
    }

    res.status(200).send('Anel deletado com sucesso!');
  } catch (error) {
    console.error('Erro ao deletar anel:', error);
    res.status(500).send('Erro ao deletar anel');
  }
};

exports.getAnelById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const anel = await AnelService.getAnelById(id);
    res.status(200).json(anel);
  } catch (error) {
    console.error('Erro ao retornar detalhes do anel:', error);
    res.status(500).send('Erro ao retornar detalhes do anel');
  }
};
