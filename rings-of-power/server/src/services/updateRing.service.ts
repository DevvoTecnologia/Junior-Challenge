import { AppError } from "../AppError";
import { AppDataSource } from "../data-source";
import { Holder } from "../entity/Holder";
import { Ring } from "../entity/Ring";

export interface IRingEdit {
  nome?: string;
  poder?: string;
  imagem?: string;
  portador?: Holder;
}
export const updateRingService = async (
  ringId: number,
  data: IRingEdit
): Promise<Ring> => {
  const ringRepository = AppDataSource.getRepository(Ring);
  const holderRepository = AppDataSource.getRepository(Holder);

  const ring = await ringRepository.findOne({ where: { id: ringId } });
  if (!ring) throw new AppError(404, "Anel não encontrado.");

  if (data.nome) {
    ring.nome = data.nome;
  }
  if (data.poder) {
    ring.poder = data.poder;
  }
  if (data.imagem) {
    ring.imagem = data.imagem;
  }
  if (data.portador) {
    let holder = await holderRepository.findOne({
      where: { nome: data.portador.nome },
    });
    if (!holder) {
      holder = holderRepository.create({ nome: data.portador.nome });
      holder = await holderRepository.save(holder);
    }
    ring.portador = holder;
  }
  return await ringRepository.save(ring);
};
