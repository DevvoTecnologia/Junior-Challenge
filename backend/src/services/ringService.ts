import AppDataSource from '../../db/data-source'; // Corrija o caminho se necessário
import { Ring } from '../models/Ring';

export const createRing = async (ringData: Partial<Ring>) => {
  const ringRepository = AppDataSource.getRepository(Ring);

  const forjadoPor = ringData.forjadoPor;
  if (!forjadoPor) {
    throw new Error('O campo "forjadoPor" é obrigatório.');
  }

  const ringsCount = await ringRepository.count({ where: { forjadoPor } });
  const maxLimit = getMaxLimit(forjadoPor);

  if (ringsCount >= maxLimit) {
    throw new Error(`Limite de ${forjadoPor} anéis excedido.`);
  }

  const newRing = ringRepository.create(ringData);
  return await ringRepository.save(newRing);
};

const getMaxLimit = (forjadoPor: string) => {
  switch (forjadoPor) {
    case 'Elfos': return 3;
    case 'Anões': return 7;
    case 'Homens': return 9;
    case 'Sauron': return 1;
    default: throw new Error('Categoria inválida');
  }
};
