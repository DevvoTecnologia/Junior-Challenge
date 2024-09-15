import { prisma } from "../../../prisma/prisma-client";
import { Forger } from "../../@types";
import IRingRepository, {
  RingCreateInputParameters,
  RingCreatedReturn,
} from "./types-ring-repository";

export class RingRepository implements IRingRepository {
  async create(data: RingCreateInputParameters): Promise<RingCreatedReturn> {
    const { name, power, forgedBy, image, carrier } = data;

    const newRing = await prisma.ring.create({
      data: {
        name,
        power,
        forgedBy,
        image: image || "url_da_imagem_padrao.jpg",
        carrier: {
          create: {
            name: carrier,
          },
        },
      },
      include: {
        carrier: true,
      },
    });

    return newRing;
  }

  async findAll(): Promise<RingCreatedReturn[]> {
    const rings = await prisma.ring.findMany({
      include: {
        carrier: true,
      },
    });

    return rings;
  }

  async findById(id: string): Promise<RingCreatedReturn | null> {
    const ring = await prisma.ring.findUnique({
      where: {
        id,
      },
      include: {
        carrier: true,
      },
    });

    return ring;
  }

  async findForgerQuantityLimit(forgedBy: Forger): Promise<number> {
    const totalRingForgedBy = await prisma.ring.count({
      where: { forgedBy },
    });

    return totalRingForgedBy;
  }

  async update(
    id: string,
    data: RingCreateInputParameters,
  ): Promise<RingCreatedReturn> {
    const { name, power, forgedBy, image, carrier } = data;

    const updatedRing = await prisma.ring.update({
      where: { id },
      data: {
        name,
        power,
        forgedBy,
        image,
        carrier: {
          update: {
            name: carrier,
          },
        },
      },
      include: {
        carrier: true,
      },
    });

    return updatedRing;
  }

  async delete(id: string): Promise<void> {
    await prisma.ring.delete({
      where: {
        id,
      },
    });
  }
}
