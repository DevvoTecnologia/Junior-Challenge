import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RingCreatorPermissions, RingEntity, RingForgedByType } from 'src/db/entities/ring.entity';
import { Repository } from 'typeorm';
import { BearerEntity } from 'src/db/entities/bearer.entity';
import { RingAlreadyExistsException, RingMaxCapacityExceededException, RingNotFoundException } from './ring.exception';
import { CreateRingDTO } from './dto/create-ring.dto';
import { UpdateRingDTO } from './dto/update-ring.dto';
import { BearerHasRingEntity } from 'src/db/entities/bearerhasring.entity';
import { RingDTO } from './dto/ring.dto';

@Injectable()
export class RingService {

  constructor(
    @InjectRepository(RingEntity) private readonly ringEntityRepository: Repository<RingEntity>,
    @InjectRepository(BearerEntity) private readonly bearerEntityRepository: Repository<BearerEntity>,
    @InjectRepository(BearerHasRingEntity) private readonly bearerHasRingEntityRepository: Repository<BearerHasRingEntity>,
  ) {}

  async list(): Promise<RingDTO[]> {
    const data = await this.ringEntityRepository.find({ relations: ['bearers', 'bearers.bearer'] });

    return data.map(ring => {
      return {
        id: ring.id,
        name: ring.name,
        power: ring.power,
        forgedBy: ring.forgedBy,
        image: ring.image,
        bearer: ring.bearers.filter(bearer => bearer.status === true)[0].bearer.name,
      } as RingDTO;
    })
  }

  async findById(ringId: string): Promise<RingEntity> {
    const ring = await this.ringEntityRepository.findOneBy({ id: ringId });

    if (!ring) {
      throw new RingNotFoundException();
    }

    return ring;
  }

  async create(createRingDTO: CreateRingDTO): Promise<RingEntity> {
    await this.verifyRingExistsByName(createRingDTO.name);
    await this.verifyRingMaxCapacity(createRingDTO.forgedBy);
    
    let bearer: BearerEntity | undefined = await this.bearerEntityRepository.findOne({ where: { name: createRingDTO.bearer } });

    if (!bearer) {
      bearer = BearerEntity.create(createRingDTO.bearer);

      bearer = await this.bearerEntityRepository.save(bearer);
    }

    let newRing = RingEntity.create(createRingDTO.name, createRingDTO.power, createRingDTO.forgedBy, createRingDTO.image);

    newRing = await this.ringEntityRepository.save(newRing);

    this.associateBearerWithRing(bearer.id, newRing.id);

    return newRing;
  }

  async update(ringId: string, updateRingDTO: UpdateRingDTO) {
    let ring = await this.findById(ringId);

    let bearer: BearerEntity | undefined = await this.bearerEntityRepository.findOne({ where: { name: updateRingDTO.bearer } });

    if (!bearer) {
      bearer = BearerEntity.create(updateRingDTO.bearer);

      bearer = await this.bearerEntityRepository.save(bearer);
    }

    ring.update(updateRingDTO.power);

    ring = await this.ringEntityRepository.save(ring);

    this.updateRingBearer(bearer.id, ring.id);
  }

  async remove(ringId: string) {
    const ring = await this.findById(ringId);

    this.ringEntityRepository.remove(ring);
  }

  private async verifyRingExistsByName(name: string) {
    const isExists = await this.ringEntityRepository.existsBy({ name: name });

    if (isExists) {
      throw new RingAlreadyExistsException();
    }
  }

  private async verifyRingMaxCapacity(forgedBy: RingForgedByType) {
    const quantityRingsCreated = await this.ringEntityRepository.countBy({ forgedBy: forgedBy });

    if (quantityRingsCreated >= RingCreatorPermissions[forgedBy].maxCreatePermissions) {
      throw new RingMaxCapacityExceededException();
    }
  }

  private async associateBearerWithRing(bearerId: string, ringId: string) {
    const associate = BearerHasRingEntity.create(bearerId, ringId);

    await this.bearerHasRingEntityRepository.save(associate);
  }

  private async updateRingBearer(bearerId: string, ringId: string) {
    const bearerHasRing = await this.bearerHasRingEntityRepository.findOneBy({ ringId: ringId, status: true });

    if (bearerHasRing.bearerId !== bearerId) {
      bearerHasRing.status = false;
      bearerHasRing.endDate = new Date();
      await this.bearerHasRingEntityRepository.save(bearerHasRing);
  
      await this.associateBearerWithRing(bearerId, ringId);
    }
  }

}
