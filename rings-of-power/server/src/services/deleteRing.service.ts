import { AppError } from "../AppError";
import { AppDataSource } from "../data-source";
import { Ring } from "../entity/Ring";

export const deleteRingService = async (ringId: number): Promise<void> => {
  const ringRepository = AppDataSource.getRepository(Ring);
  const ring = await ringRepository.findOne({ where: { id: ringId } });
  if (!ring) throw new AppError(404, "Anel não encontrado.");

  await ringRepository.delete(ring);
};
