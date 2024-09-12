import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrier } from './carrier.entity';
import { CarriersController } from './carriers.controller';
import { CarriersService } from './carriers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  controllers: [CarriersController],
  providers: [CarriersService, Repository],
  exports: [CarriersService],
})
export class CarriersModule {}
