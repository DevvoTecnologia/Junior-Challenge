import { Request, Response } from 'express';
const PortadorService = require('../services/portadorService');

exports.listarPortadores = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const portadores = await PortadorService.listarPortadores();
    res.status(200).json(portadores);
  } catch (error) {
    console.error('Erro ao listar portadores:', error);
    res.status(500).send('Erro ao listar portadores');
  }
};
