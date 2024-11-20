import { AppError } from "../AppError";
import { AppDataSource } from "../data-source";
import { Forger, TypeForger } from "../entity/Forger";
import { Holder } from "../entity/Holder";
import { Ring } from "../entity/Ring";

export interface IRingCreate {
  nome: string;
  poder: string;
  imagem: string;
  forjadoPorId: number;
  portador: Holder;
}

export const createRingService = async (data: IRingCreate): Promise<Ring> => {
  const ringRepository = AppDataSource.getRepository(Ring);
  const forgerRepository = AppDataSource.getRepository(Forger);
  const holderRepository = AppDataSource.getRepository(Holder);

  const forger = await forgerRepository.findOne({
    where: { id: data.forjadoPorId },
  });

  const forgedRingsCount = await ringRepository.count({
    where: { forjadoPor: forger },
  });

  switch (forger.tipo) {
    case TypeForger.Elfos:
      if (forgedRingsCount >= 3) {
        throw new AppError(400, "Elfos só podem forjar no máximo 3 anéis");
      }
      break;
    case TypeForger.Anoes:
      if (forgedRingsCount >= 7) {
        throw new AppError(400, "Anões só podem forjar no máximo 7 anéis");
      }
      break;
    case TypeForger.Homens:
      if (forgedRingsCount >= 9) {
        throw new AppError(400, "Homens só podem forjar no máximo 9 anéis");
      }
      break;
    case TypeForger.Sauron:
      if (forgedRingsCount >= 1) {
        throw new AppError(400, "Sauron só pode forjar 1 anel");
      }
      break;
  }

  let holder = await holderRepository.findOne({
    where: { nome: data.portador.nome },
  });

  if (!holder) {
    holder = holderRepository.create({ nome: data.portador.nome });
    holder = await holderRepository.save(holder);
  }
  const newRing = ringRepository.create({
    nome: data.nome,
    poder: data.poder,
    imagem: data.imagem,
    forjadoPor: forger,
    portador: holder,
  });

  return await ringRepository.save(newRing);
};
