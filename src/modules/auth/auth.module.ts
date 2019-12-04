import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'SoupSnap',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})

export class AuthModule {
}
