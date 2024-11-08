import Portador from '../models/Portador';

exports.listarPortadores = async () => {
  try {
    return await Portador.find().populate({
      path: 'etnia',
      model: 'Etnia',
      select: '_id nome',
    });
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error('Erro ao listar portadores: ' + error.message);
    throw new Error('Erro desconhecido');
  }
};
