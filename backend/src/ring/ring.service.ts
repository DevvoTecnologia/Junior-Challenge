import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CreateRingDto } from "./dto/create-ring.dto";
import { Ring } from "./entities/ring.entity";

@Injectable()
export class RingService {
  constructor(
    @InjectModel(Ring)
    private readonly ringModel: typeof Ring,
  ) {}

  async create(createRingDto: CreateRingDto): Promise<Ring> {
    const { name, power, owner, forgedBy } = createRingDto;

    const newRing = await this.ringModel.create({
      name,
      power,
      owner,
      forgedBy,
    });

    return newRing;
  }

  async findAll(): Promise<Ring[]> {
    const rings = await this.ringModel.findAll();

    return rings;
  }

  async update(id: number, updateRingDto: CreateRingDto): Promise<Ring> {
    const { name, power, owner, forgedBy } = updateRingDto;

    const ring = await this.ringModel.findByPk(id);

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    ring.name = name;
    ring.power = power;
    ring.owner = owner;
    ring.forgedBy = forgedBy;

    await ring.save();

    return ring;
  }

  async delete(id: number): Promise<null> {
    const ring = await this.ringModel.findByPk(id);

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    await ring.destroy();

    return null;
  }
}
