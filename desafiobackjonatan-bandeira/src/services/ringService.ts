import Anel from "../models/Anel";
import Portador from "../models/Portador";
import { TForjador, TForm } from "../models/types";

// Cria um novo anel
const createRing = async (form: TForm) => {
  const portadorNome: string = form.portador;
  const forjador = form.forjadoPor;

  const { count } = await Anel.findAndCountAll({
    where: {
      forjadoPor: form.forjadoPor,
    },
  });

  type RacasConfig = {
    [key in TForjador]: any;
  };

  const racasConf: RacasConfig = {
    Anão: { max: 7 },
    Elfo: { max: 3 },
    Humano: { max: 9 },
    Sauron: { max: 1 },
  };

  if (count >= racasConf[forjador].max) {
    throw new Error(`${forjador} já atingiu o limite de anéis (${racasConf[forjador].max}).`);
  }

  let portador = await Portador.findOne({ where: { nome: portadorNome } });

  if (!portador) {
    portador = await Portador.create({ nome: portadorNome });
  }

  const novoAnel = await Anel.create({
    nome: form.nome,
    poder: form.poder,
    forjadoPor: form.forjadoPor,
    imagem: form.imagem, // URL da imagem
    portadorId: portador.id,
  });

  return novoAnel;
};

// Obtém todos os anéis
const getRingsService = async () => {
  try {
    const aneis = await Anel.findAll({
      include: {
        model: Portador,
        as: 'portador', // Aqui você usa o alias definido na associação
        attributes: ['id', 'nome'], // Campos que você deseja trazer de Portador
      },
    });
    return aneis;
  } catch (error) {
    console.error('Erro ao buscar os anéis:', error);
    throw error;
  }
}

// Atualiza um anel existente
const updateRingService = async (id: number, form: TForm) => {
  const anel = await Anel.findByPk(id);

  if (!anel) {
    throw new Error(`Anel com ID ${id} não encontrado.`);
  }

  const portadorNome: string = form.portador;
  let portador = await Portador.findOne({ where: { nome: portadorNome } });

  if (!portador) {
    portador = await Portador.create({ nome: portadorNome });
  }

  await anel.update({
    nome: form.nome,
    poder: form.poder,
    forjadoPor: form.forjadoPor,
    imagem: form.imagem, // URL da imagem
    portadorId: portador.id,
  });

  return anel;
};

// Deleta um anel existente
const deleteRingService = async (id: number) => {
  const anel = await Anel.findByPk(id);

  if (!anel) {
    throw new Error(`Anel com ID ${id} não encontrado.`);
  }

  await anel.destroy();
  return anel;
};

export { createRing, getRingsService, updateRingService, deleteRingService };
