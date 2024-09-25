import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import RingGlobalValidations from "./RingGlobalValidations";
import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";

@Injectable()
export class RingService extends RingGlobalValidations {
  private readonly logger = new Logger(RingService.name);

  constructor(
    @InjectModel(Ring)
    private readonly ringModel: typeof Ring,
  ) {
    super();
  }

  async create(
    createRingDto: CreateRingDto,
    file: Express.Multer.File,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = createRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (!this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    await this.validateRingCreation(this.ringModel, createRingDto.forgedBy);

    const newRing = await this.ringModel.create({
      name,
      power,
      owner,
      forgedBy,
      image: file.originalname,
    });

    return newRing;
  }

  async findAll(): Promise<Ring[]> {
    const rings = await this.ringModel.findAll();

    if (!rings.length) {
      throw new NotFoundException("No rings found");
    }

    return rings;
  }

  async update(
    id: number,
    updateRingDto: UpdateRingDto,
    file: Express.Multer.File,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = updateRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (forgedBy && !this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    if (updateRingDto.forgedBy) {
      await this.validateRingCreation(this.ringModel, updateRingDto.forgedBy);
    }

    const ring = await this.ringModel.findByPk(id);

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    ring.name = name ?? ring.name;
    ring.power = power ?? ring.power;
    ring.owner = owner ?? ring.owner;
    ring.forgedBy = forgedBy ?? ring.forgedBy;
    ring.image = file.originalname;

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
