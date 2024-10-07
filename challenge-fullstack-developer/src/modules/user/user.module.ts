import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/provider/prisma.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
  exports: [UserService]
})

export class UserModule {}