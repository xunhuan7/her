import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as  APP_CONFIG from '../../app.config';
import { JwtStrategy } from './jwt.strategy';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: APP_CONFIG.AUTH.JWT_TOKEN_SECRET,
      signOptions: {
        expiresIn: APP_CONFIG.AUTH.EXPIRE_IN,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {
}
