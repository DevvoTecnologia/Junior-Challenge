import prismaClient from "../prisma";

interface CreateCustomerProps {
  imageURL: string;
  name: string;
  power: string;
  carrier: string;
  forger: string;
  info: string;
}

class CreateCustomerService {
  async execute({ imageURL, name, power, carrier, forger, info }: CreateCustomerProps) {
    if (!imageURL || !name || !power || !carrier || !forger || !info) {
      throw new Error("Preencha todos os campos");
    }

    // Definindo limites para cada tipo de forjador
    const ringLimits: { [key: string]: number } = {
      Elfos: 4,
      Anões: 8,
      Homens: 10,
      Sauron: 2,
    };

    // Contando o número de anéis existentes para o tipo de forjador
    const currentCount = await prismaClient.customer.count({
      where: { forger },
    });
    const limit = ringLimits[forger];

    if (currentCount >= limit) {
      throw new Error(`Limite de criação de anéis para ${forger} excedido.`);
    }

    // Criando o novo anel
    const customer = await prismaClient.customer.create({
      data: {
        imageURL,
        name,
        power,
        carrier,
        forger,
        info,
        status: true,
      },
    });

    return customer;
  }
}

export { CreateCustomerService };

