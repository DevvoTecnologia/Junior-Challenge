import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
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
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    super();
  }

  async findAll(req: ReqAuthUser): Promise<Ring[]> {
    const cacheKey = `rings_user_${req.user.sub}`;

    const cachedRings = await this.cacheManager.get<Ring[]>(cacheKey);

    if (cachedRings) {
      return cachedRings;
    }

    const rings = await this.ringModel.findAll({
      where: {
        userId: req.user.sub,
      },
    });

    if (!rings.length) {
      throw new NotFoundException("No rings found");
    }

    await this.cacheManager.set(cacheKey, rings);

    return rings;
  }

  async findOne(id: number, req: ReqAuthUser): Promise<Ring> {
    const cacheKey = `ring_${id}_user_${req.user.sub}`;

    const cachedRing = await this.cacheManager.get<Ring>(cacheKey);

    if (cachedRing) {
      return cachedRing;
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

    await this.cacheManager.set(cacheKey, ring);

    return ring;
  }

  async create(
    createRingDto: CreateRingDto,
    file: Express.Multer.File,
    req: ReqAuthUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = createRingDto;

    // Validate image type
    await this.validateImageType(file.buffer);

    // Invalidate if forgedBy is not a valid ring
    if (!this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
    }

    // Validate ring creation
    await this.validateRingCreation(
      this.ringModel,
      createRingDto.forgedBy,
      req.user.sub,
    );

    // Generate a new unique image name
    const newImageName = this.generateNewUniqueImageName(file.originalname);

    let newRing: Ring;

    try {
      newRing = await this.ringModel.create({
        name,
        power,
        owner,
        forgedBy,
        image: newImageName,
        userId: req.user.sub,
      });

      // Save or update ring image
      await this.saveRingImage(file.buffer, newImageName);
    } catch {
      throw new BadRequestException("Error creating ring");
    }

    // Invalidate cache
    const cacheKey = `rings_user_${req.user.sub}`;
    await this.cacheManager.del(cacheKey);

    return newRing;
  }

  async update(
    id: number,
    updateRingDto: UpdateRingDto,
    file: Express.Multer.File | undefined,
    req: ReqAuthUser,
  ): Promise<Ring> {
    const { name, power, owner, forgedBy } = updateRingDto;

    // Invalidate if forgedBy is not a valid ring
    if (forgedBy && !this.isValidRing(forgedBy)) {
      throw new BadRequestException(`Invalid forgedBy value: ${forgedBy}`);
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

    if (updateRingDto.forgedBy) {
      // Validate ring creation
      await this.validateRingCreation(
        this.ringModel,
        updateRingDto.forgedBy,
        req.user.sub,
        ring,
      );
    }

    // Save or update ring image
    if (file) {
      const imageSaved = await this.updateRingImage(file, ring.image);

      ring.image = imageSaved;
    }

    ring.name = name || ring.name; // nosonar
    ring.power = power || ring.power; // nosonar
    ring.owner = owner || ring.owner; // nosonar
    ring.forgedBy = forgedBy || ring.forgedBy; // nosonar

    await ring.save();

    // Invalidate the cache for the updated ring
    const ringCacheKey = `ring_${id}_user_${req.user.sub}`;
    const ringsCacheKey = `rings_user_${req.user.sub}`;
    await this.cacheManager.del(ringCacheKey);
    await this.cacheManager.del(ringsCacheKey);

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

    await this.deleteRingImage(ring.image);

    await ring.destroy();

    // Invalidate the cache for the deleted ring
    const ringCacheKey = `ring_${id}_user_${req.user.sub}`;
    const ringsCacheKey = `rings_user_${req.user.sub}`;
    await this.cacheManager.del(ringCacheKey);
    await this.cacheManager.del(ringsCacheKey);

    return null;
  }
}
