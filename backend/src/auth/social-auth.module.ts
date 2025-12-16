import { Module } from '@nestjs/common';
import { SocialAuthController } from './social-auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SocialAuthController],
  providers: [],
  exports: [],
})
export class SocialAuthModule {}
