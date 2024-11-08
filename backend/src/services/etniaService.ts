import Etnia from '../models/Etnia';

exports.listarEtnias = async () => {
  try {
    return await Etnia.find();
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error('Erro ao listar etnias: ' + error.message);
    throw new Error('Erro desconhecido');
  }
};
