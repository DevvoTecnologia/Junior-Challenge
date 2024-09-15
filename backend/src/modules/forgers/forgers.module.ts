import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forger } from './forger.entity';
import { ForgersController } from './forgers.controller';
import { ForgersRepository } from './forgers.repository';
import { ForgersService } from './forgers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Forger])],
  controllers: [ForgersController],
  providers: [ForgersService, ForgersRepository],
  exports: [ForgersService],
})
export class ForgersModule {}
