import { Module } from '@nestjs/common';
import { RingController } from './ring.controller';
import { RingService } from './ring.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RingEntity } from 'src/db/entities/ring.entity';
import { BearerEntity } from 'src/db/entities/bearer.entity';
import { BearerHasRingEntity } from 'src/db/entities/bearerhasring.entity';

@Module({
  controllers: [RingController],
  imports: [TypeOrmModule.forFeature([RingEntity, BearerEntity, BearerHasRingEntity])],
  providers: [RingService]
})
export class RingModule {}
