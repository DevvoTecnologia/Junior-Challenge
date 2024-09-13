import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RingModule } from './modules/ring/ring.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RingModule
  ]
})
export class AppModule {}