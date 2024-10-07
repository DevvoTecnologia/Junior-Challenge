import { Module } from '@nestjs/common';
import { RingController } from './ring.controller';
import { RingService } from './ring.service';
import { PrismaService } from 'src/provider/prisma.service';

@Module({
  controllers: [RingController],
  providers: [PrismaService, RingService],
  exports: [RingService]
})

export class RingModule {}