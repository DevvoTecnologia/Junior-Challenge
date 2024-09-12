import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './database/database.module';
import { CarriersModule } from './modules/carriers/carriers.module';
import { ForgersModule } from './modules/forgers/forgers.module';
import { RingModule } from './modules/rings/rings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RingModule,
    ForgersModule,
    CarriersModule,
    DBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
