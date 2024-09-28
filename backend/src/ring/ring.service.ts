import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/sequelize";

import RingGlobalValidations from "./RingGlobalValidations";
import { CreateRingDto } from "./dto/create-ring.dto";
import { UpdateRingDto } from "./dto/update-ring.dto";
import { Ring } from "./entities/ring.entity";
import { ReqAuthUser } from "./types/Req";

@Injectable()
export class RingService extends RingGlobalValidations {
  private readonly logger = new Logger(RingService.name);

  constructor(
    @InjectModel(Ring)
    private readonly ringModel: typeof Ring,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async findAll(req: ReqAuthUser): Promise<Ring[]> {
    const rings = await this.ringModel.findAll({
      where: {
        userId: req.user.sub,
      },
    });

    if (!rings.length) {
      throw new NotFoundException("No rings found");
    }

    return rings;
  }

  async create(
    createRingDto: CreateRingDto,
    file: Express.Multer.File,
    req: ReqAuthUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = createRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (!this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    await this.validateRingCreation(
      this.ringModel,
      createRingDto.forgedBy,
      req.user.sub,
    );

    // Save or update ring image
    const imageSaved = await this.saveOrUpdateRingImage(file);

    let newRing: Ring;

    try {
      newRing = await this.ringModel.create({
        name,
        power,
        owner,
        forgedBy,
        image: imageSaved,
        userId: req.user.sub,
      });
    } catch {
      throw new BadRequestException("Error creating ring");
    }

    const host = this.configService.get("host");
    const port = this.configService.get("port");

    newRing.url = `${host}:${port}/uploads/${newRing.image}`;

    return newRing;
  }

  async update(
    id: number,
    updateRingDto: UpdateRingDto,
    file: Express.Multer.File,
    req: ReqAuthUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = updateRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (forgedBy && !this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    if (updateRingDto.forgedBy) {
      await this.validateRingCreation(
        this.ringModel,
        updateRingDto.forgedBy,
        req.user.sub,
      );
    }

    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    // Save or update ring image
    const imageSaved = await this.saveOrUpdateRingImage(file, {
      isUpdate: true,
      oldFileName: ring.image,
    });

    ring.name = name ?? ring.name;
    ring.power = power ?? ring.power;
    ring.owner = owner ?? ring.owner;
    ring.forgedBy = forgedBy ?? ring.forgedBy;
    ring.image = imageSaved;

    const host = this.configService.get("host");
    const port = this.configService.get("port");

    ring.url = `${host}:${port}/uploads/${ring.image}`;

    await ring.save();

    return ring;
  }

  async delete(id: number, req: ReqAuthUser): Promise<null> {
    const ring = await this.ringModel.findOne({
      where: {
        id: id,
        userId: req.user.sub,
      },
    });

    if (!ring) {
      throw new NotFoundException(`Ring with id ${id} not found`);
    }

    await ring.destroy();

    await this.deleteRingImage(ring.image);

    return null;
  }
}
