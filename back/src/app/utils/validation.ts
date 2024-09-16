import { AppDataSource } from "../../database/data-source";
import { Anel } from "../entities/Anel";
import { IAnel } from "../interfaces/IAnel";
import { TipoForjador } from "../types/TipoForjador";

const anelRepository = AppDataSource.getRepository(Anel);

// Limitações por quantidade de anéis
const maximosPermitidos: Record<string, number> = {
  [TipoForjador.ELFOS]: 3,
  [TipoForjador.ANOES]: 7,
  [TipoForjador.HOMENS]: 9,
  [TipoForjador.SAURON]: 1,
};

const validation = ({ name, power, holder, forger }: IAnel): string[] => {
  const valores = {
    name,
    power,
    holder,
    forger,
  };

  let vazio: string[] = [];

  for (let [campo, valor] of Object.entries(valores)) {
    if (!valor) {
      vazio.push(campo);
    }
  }


  return vazio;
};

const validarForjadoresPermitidos = (anel: IAnel): boolean => {
  const forjadoresPermitidos = [
    TipoForjador.ELFOS,
    TipoForjador.ANOES,
    TipoForjador.HOMENS,
    TipoForjador.SAURON,
  ];

  if (!forjadoresPermitidos.includes(anel.forger)) {
    return false;
  }
  return true;
};

const validarQuantidadeForjadores = async (anel: IAnel): Promise<boolean> => {
  // Verificar se o Forjador já excedeu o limite de anéis
  const aneisDoForjador = await anelRepository.count({
    where: { forger: anel.forger },
  });

  return aneisDoForjador >= maximosPermitidos[anel.forger]
};

const validarQuantidade = async (forger: TipoForjador): Promise<boolean> => {
  const aneisDoForjador = await anelRepository.count({
    where: { forger: forger },
  });


  return aneisDoForjador >= maximosPermitidos[forger]

};

export { validation, validarForjadoresPermitidos, validarQuantidadeForjadores,validarQuantidade };
