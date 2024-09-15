import { AppDataSource } from "../config/database";
import { Forjador } from "../domain/entities/Forjador";
import { Portador } from "../domain/entities/Portador";
import { Ring } from "../domain/entities/Ring";

const seedDatabase = async () => {
  await AppDataSource.initialize();

  const forjadorRepository = AppDataSource.getRepository(Forjador);
  const portadorRepository = AppDataSource.getRepository(Portador);
  const ringRepository = AppDataSource.getRepository(Ring);


  const elfos = forjadorRepository.create({ nome: "Elfos", limite_aneis: 3 });
  const anoes = forjadorRepository.create({ nome: "Anões", limite_aneis: 7 });
  const homens = forjadorRepository.create({ nome: "Homens", limite_aneis: 9 });
  const sauron = forjadorRepository.create({ nome: "Sauron", limite_aneis: 1 });
  await forjadorRepository.save([elfos, anoes, homens, sauron]);


  const gandalf = portadorRepository.create({ nome: "Gandalf" });
  const elrond = portadorRepository.create({ nome: "Elrond" });
  const sauronPortador = portadorRepository.create({ nome: "Sauron" });
  const aragorn = portadorRepository.create({ nome: "Aragorn" });
  await portadorRepository.save([gandalf, elrond, sauronPortador, aragorn]);


  const narya = ringRepository.create({
    nome: "Narya, o anel do fogo",
    poder: "Seu portador ganha resistência ao fogo",
    imagem: "https://example.com/narya.png",
    portador: gandalf,
    forjadoPor: elfos,
  });

  const vilya = ringRepository.create({
    nome: "Vilya, o anel do ar",
    poder: "Controla os ventos",
    imagem: "https://example.com/vilya.png",
    portador: elrond,
    forjadoPor: elfos,
  });

  const terceiroAnelElfos = ringRepository.create({
    nome: "Terceiro anel dos Elfos",
    poder: "Poder especial dos Elfos",
    imagem: "https://example.com/elfos3.png",
    portador: elrond,
    forjadoPor: elfos,
  });

  const anelUnico = ringRepository.create({
    nome: "Anel Único",
    poder: "Controla os outros anéis",
    imagem: "https://example.com/anel_unico.png",
    portador: sauronPortador,
    forjadoPor: sauron,
  });

  const anelHomens = ringRepository.create({
    nome: "Primeiro Anel dos Homens",
    poder: "Dá poder ao portador",
    imagem: "https://example.com/anel_homens.png",
    portador: aragorn,
    forjadoPor: homens,
  });

  await ringRepository.save([narya, vilya, terceiroAnelElfos, anelUnico, anelHomens]);

  console.log("Anéis, portadores e forjadores inseridos com sucesso!");
  await AppDataSource.destroy();
};

seedDatabase().catch((error) => console.error(error));
