import mongoose from 'mongoose';
import Anel from '../models/Anel';
import Etnia from '../models/Etnia';

export interface ICreateAnel {
  nome: string;
  poder: string;
  forjadoPor: string;
  imagem_url: string;
  portador: mongoose.Schema.Types.ObjectId;
}

exports.createAnel = async (anelData: ICreateAnel) => {
  const etnia = await Etnia.findById(anelData.forjadoPor);
  if (!etnia) throw new Error('Etnia não encontrada.');

  const anelCount = await Anel.countDocuments({ forjadoPor: etnia._id });
  if (anelCount >= etnia.limitAneis) {
    throw new Error(`Limite de anéis para a etnia ${etnia.nome} atingido.`);
  }

  const anel = new Anel({
    ...anelData,
    portador: anelData.portador,
  });

  return await anel.save();
};

exports.listarAneis = async () => {
  try {
    return await Anel.find()
      .populate({ path: 'forjadoPor', model: 'Etnia', select: '_id nome' })
      .populate({ path: 'portador', model: 'Portador', select: '_id nome' });
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error('Erro ao listar aneis: ' + error.message);
    throw new Error('Erro desconhecido');
  }
};

export interface IUpdateAnel {
  nome?: string;
  poder?: string;
  forjadoPor?: string;
  imagem_url?: string;
  portadores?: mongoose.Schema.Types.ObjectId[];
}

exports.updateAnel = async (id: string, anelData: IUpdateAnel) => {
  const etnia = await Etnia.findById(anelData.forjadoPor);
  if (!etnia) throw new Error('Etnia não encontrada.');

  const anelCount = await Anel.countDocuments({ forjadoPor: etnia._id });
  if (anelCount >= etnia.limitAneis) {
    throw new Error(`Limite de anéis para a etnia ${etnia.nome} atingido.`);
  }

  const updatedAnel = await Anel.findByIdAndUpdate(id, anelData, { new: true });
  return updatedAnel;
};

exports.deleteAnel = async (id: string) => {
  try {
    const objectId = new mongoose.Types.ObjectId(id);
    const deletedAnel = await Anel.findByIdAndDelete(objectId);

    return deletedAnel;
  } catch (error: unknown) {
    if (error instanceof Error)
      throw new Error('Erro ao deletar anel: ' + error.message);
    throw new Error('Erro desconhecido');
  }
};

exports.getAnelById = async (id: string) => {
  try {
    const anel = await Anel.findById(id).populate('portador', 'nome');
    if (!anel) {
      throw new Error('Anel não encontrado');
    }
    return anel;
  } catch (error) {
    if (error instanceof Error)
      throw new Error('Erro ao buscar anel: ' + error.message);
    throw new Error('Erro desconhecido');
  }
};
