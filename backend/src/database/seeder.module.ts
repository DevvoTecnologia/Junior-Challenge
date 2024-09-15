import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrier } from '../modules/carriers/carrier.entity';
import { CarriersService } from '../modules/carriers/carriers.service';
import { Forger } from '../modules/forgers/forger.entity';
import { ForgersService } from '../modules/forgers/forgers.service';
import { DBModule } from './database.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Forger, Carrier]),
    ConfigModule.forRoot({ isGlobal: true }),
    DBModule,
  ],
  providers: [SeederService, ForgersService, CarriersService, Repository],
})
export class SeederModule {}
