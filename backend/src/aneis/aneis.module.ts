import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AneisController } from './aneis.controller';
import { AneisService } from './aneis.service';
import { Anel } from './anel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anel])],
  controllers: [AneisController],
  providers: [AneisService],
})
export class AneisModule {}