import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrier } from './carrier.entity';
import { CarriersController } from './carriers.controller';
import { CarriersRepository } from './carriers.repository';
import { CarriersService } from './carriers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  controllers: [CarriersController],
  providers: [CarriersService, CarriersRepository],
  exports: [CarriersService],
})
export class CarriersModule {}
