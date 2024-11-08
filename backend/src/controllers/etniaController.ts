import { Request, Response } from 'express';
const EtniaService = require('../services/etniaService');

exports.listarEtnias = async (req: Request, res: Response): Promise<void> => {
  try {
    const etnias = await EtniaService.listarEtnias();
    res.status(200).json(etnias);
  } catch (error) {
    console.error('Erro ao listar etnias:', error);
    res.status(500).send('Erro ao listar etnias');
  }
};
