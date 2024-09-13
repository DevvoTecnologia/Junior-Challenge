import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarriersModule } from '../carriers/carriers.module';
import { ForgersModule } from '../forgers/forgers.module';
import { Ring } from './ring.entity';
import { RingController } from './rings.controller';
import { RingsRepository } from './rings.repository';
import { RingService } from './rings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ring]), CarriersModule, ForgersModule],
  controllers: [RingController],
  providers: [RingService, RingsRepository],
})
export class RingModule {}
