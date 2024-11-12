import { AppError } from "../AppError";
import { AppDataSource } from "../data-source";
import { Ring } from "../entity/Ring";

export const getRingsService = async () => {
  const ringsRepository = AppDataSource.getRepository(Ring);
  const rings = await ringsRepository.find({
    relations: ["forjadoPor", "portador"],
  });

  if (!rings.length) {
    throw new AppError(404, "Nenhum anel foi cadastrado ainda.");
  }

  const ringsAdapted = rings.map((ring) => ({
    id: ring.id,
    nome: ring.nome,
    poder: ring.poder,
    imagem: ring.imagem,
    forjadoPor: ring.forjadoPor.tipo,
    portador: ring.portador.nome,
  }));
  return ringsAdapted;
};
