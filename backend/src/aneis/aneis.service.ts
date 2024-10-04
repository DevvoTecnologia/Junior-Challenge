import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anel } from './anel.entity';
import { CreateAnelDto, UpdateAnelDto } from '../dto/anel.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AneisService {
  constructor(
    @InjectRepository(Anel)
    private anelRepository: Repository<Anel>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllByUser(userId: number): Promise<Anel[]> {
    return this.anelRepository.find({
      where: { user: { id: userId } },
      relations: ['user']
    });
  }

  async findOneByUser(id: number, userId: number): Promise<Anel> {
    const anel = await this.anelRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user']
    });
    if (!anel) {
      throw new NotFoundException(`Anel com ID ${id} não encontrado ou não pertence ao usuário`);
    }
    return anel;
  }

  async create(createAnelDto: CreateAnelDto, userId: number): Promise<Anel> {
    const { forjadoPor } = createAnelDto;

    if (!['Elfos', 'Anões', 'Homens', 'Sauron'].includes(forjadoPor)) {
      throw new BadRequestException(`Criador inválido: ${forjadoPor}`);
    }

    await this.validateAnelCreation(forjadoPor);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    const anel = this.anelRepository.create({
      ...createAnelDto,
      user: user
    });
    return this.anelRepository.save(anel);
  }

  async update(id: number, updateAnelDto: UpdateAnelDto, userId: number): Promise<Anel> {
    const anel = await this.findOneByUser(id, userId);
    Object.assign(anel, updateAnelDto);
    return this.anelRepository.save(anel);
  }

  async remove(id: number, userId: number): Promise<void> {
    const anel = await this.findOneByUser(id, userId);
    await this.anelRepository.remove(anel);
  }

  private async validateAnelCreation(forjadoPor: string): Promise<void> {
    const count = await this.anelRepository.count({ where: { forjadoPor } });

    const limits = {
      'Elfos': 3,
      'Anões': 7,
      'Homens': 9,
      'Sauron': 1
    };

    if (count >= limits[forjadoPor]) {
      throw new BadRequestException(`Limite de anéis excedido para ${forjadoPor}`);
    }
  }
}