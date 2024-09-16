import { Anel } from "../entities/Anel";
import { IAnel } from "../interfaces/IAnel";
import { AppDataSource } from "../../database/data-source";
import {
  validarForjadoresPermitidos,
  validarQuantidadeForjadores,
} from "../utils/validation";
// import { error } from "console";

const anelRepository = AppDataSource.getRepository(Anel);

const getAneis = (): Promise<IAnel[]> => {
  return anelRepository.find();
};

const createAnel = async (anel: IAnel): Promise<IAnel | null> => {
  try {
    if (!validarForjadoresPermitidos(anel)) {
      throw new Error("Forjador não permitido");
    }

    if (await validarQuantidadeForjadores(anel)) {
      throw new Error(
        `${anel.forger} já possui o número máximo de anéis permitidos. `
      );
    }

    // Se tudo estiver ok, adiciona o anel ao banco de dados
    const novoAnel = anelRepository.create(anel);
    return await anelRepository.save(novoAnel);
  } catch (error) {
    console.error(error, "erro");
  }
};

const atualizarAnel = async (anel: IAnel): Promise<IAnel | null> => {
  try {
    if (!validarForjadoresPermitidos(anel)) {
      throw new Error("Forjador não permitido");
    }

    if (!validarQuantidadeForjadores(anel)) {
      throw new Error(
        `${anel.forger} já possui o número máximo de anéis permitidos.`
      );
    }

    if (!anel.id) {
      throw Error("ID do anel não fornecido");
    }

    const anelExistente = await anelRepository.findOne({
      where: { id: anel.id },
    });

    if (!anelExistente) {
      throw Error(`Anel com ID ${anel.id} não encontrado.`);
    }

    anelRepository.merge(anelExistente, anel);

    const novoAnel = anelRepository.save(anelExistente);
    return novoAnel;
  } catch (error) {
    console.error(`Erro ao atulizar o anel: ${error}`);
  }
};

export default { getAneis, createAnel, atualizarAnel };
