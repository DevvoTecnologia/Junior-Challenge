import { RingAttributes } from "../@types/ring";
import RingRepository from "../repositories/RingRepository";

interface MaxRings {
  Elves: number;
  Dwarves: number;
  Men: number;
  Sauron: number;
}

const maxRings: MaxRings = {
  Elves: 3,
  Dwarves: 7,
  Men: 9,
  Sauron: 1,
};
class RingService {
  async create(data: RingAttributes) {
    const count = await RingRepository.countRingsByForjadoPor(data.forgedBy);

    if (count >= maxRings[data.forgedBy]) {
      throw new Error(`Não é possível criar mais anéis para ${data.forgedBy}.`);
    }

    return await RingRepository.create(data);
  }

  async getAll() {
    return await RingRepository.findAll();
  }

  async update(id: string, data: RingAttributes) {
    const count = await RingRepository.countRingsByForjadoPor(data.forgedBy);

    if (count >= maxRings[data.forgedBy]) {
      throw new Error(`Não é possível criar mais anéis para ${data.forgedBy}.`);
    }

    return await RingRepository.update(id, data);
  }

  async findById(id: string) {
    return await RingRepository.findById(id);
  }

  async delete(id: string) {
    return await RingRepository.delete(id);
  }
}

export default new RingService();
