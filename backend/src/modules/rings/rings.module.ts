import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarriersModule } from '../carriers/carriers.module';
import { ForgersModule } from '../forgers/forgers.module';
import { Ring } from './ring.entity';
import { RingController } from './rings.controller';
import { RingService } from './rings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ring]), CarriersModule, ForgersModule],
  controllers: [RingController],
  providers: [RingService, Repository],
})
export class RingModule {}
