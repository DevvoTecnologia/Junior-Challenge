import { AppError } from "../AppError";
import { AppDataSource } from "../data-source";
import { Ring } from "../entity/Ring";

export const getRingByIdService = async (id: number) => {
  const ringsRepository = AppDataSource.getRepository(Ring);

  const ring = await ringsRepository.findOne({
    where: { id },
    relations: ["forjadoPor", "portador"],
  });

  if (!ring) {
    throw new AppError(404, "Anel não encontrado.");
  }

  const ringAdapted = {
    id: ring.id,
    nome: ring.nome,
    poder: ring.poder,
    imagem: ring.imagem,
    forjadoPor: ring.forjadoPor.id,
    portador: ring.portador.nome,
  };

  return ringAdapted;
};
