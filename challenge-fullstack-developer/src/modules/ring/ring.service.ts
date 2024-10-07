import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { RingDto } from './dto/ring.dto';
import { PrismaService } from 'src/provider/prisma.service';
import { Class } from '@prisma/client';
import { ResponseRing } from './interface/responseRing.interface';

@Injectable()
export class RingService {
  constructor(private prismaService: PrismaService) {}

  async getAllRings(): Promise<ResponseRing> {
    const rings: any = await this.prismaService.ring.findMany();

    return rings;
  };

  async getByIdRing(id: number): Promise<ResponseRing> {
    const ring = await this.prismaService.ring.findUnique({
      where: {
        id: id
      },
    });

    if (!ring) {
      throw new NotFoundException("Nenhum anel foi encontrado");
    };

    return ring;
  };

  async createRing(ringDto: RingDto): Promise<void> {
    const actualForged = await this.prismaService.ring.findMany({
      where: { forgedBy: Class[ringDto.forgedBy] },
    });

    const limitClass = {
      [Class.ELVES]: 3,
      [Class.DWARVES]: 7,
      [Class.MEN]: 9,
      [Class.SAURON]: 1,
    };

    const classLimit = limitClass[Class[ringDto.forgedBy]];

    if (actualForged.length >= classLimit) {
      throw new NotFoundException("Você já atingiu o limite.");
    };
  
    const newRing = await this.prismaService.ring.create({
      data: {
        name: ringDto.name,
        power: ringDto.power,
        carrier: ringDto.carrier,
        forgedBy: Class[ringDto.forgedBy],
        image: ringDto.image
      }
    });

    if (!newRing) {
      throw new HttpException('Erro ao criar um anel. Tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async updateRing(idRing: number, ringDto: RingDto): Promise<void> {
    const actualRing = await this.prismaService.ring.findUnique({
      where: { id: idRing },
    });

    if (!actualRing) {
      throw new NotFoundException("Anel não encontrado.");
    };

    const ringUpdate = await this.prismaService.ring.update({
      where: { id: idRing },
      data: {
        name: ringDto.name,
        power: ringDto.power,
        carrier: ringDto.carrier,
        forgedBy: Class[ringDto.forgedBy],
        image: ringDto.image
      }
    });

    if (!ringUpdate) {
      throw new HttpException('Erro ao atualizar. Tente novamente.', HttpStatus.INTERNAL_SERVER_ERROR);
    };
  };

  async deleteRing(id: number): Promise<void> {
    const actualRing = await this.prismaService.ring.findUnique({
      where: { id }
    });

    if (!actualRing) {
      throw new HttpException('Anel não encontrada.', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.ring.delete({
      where: { id }
    });
  };
};