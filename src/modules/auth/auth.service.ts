import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { AuthDTO } from '../user/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(payload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }

  async login(authDto: AuthDTO) {
    const { email, password } = authDto;
    const entity = await this.userService.findOneByEmail(email);

    if (!entity) {
      throw new UnauthorizedException('Account does not exist!');
    }

    if (entity.password !== password) {
      throw new UnauthorizedException('Wrong password!');
    }

    const { id, nickname } = entity;
    const payload = { id, email };
    const token = this.jwtService.sign(payload, {
      expiresIn: 7 * 24 * 60 * 60,
    });

    return {
      nickname,
      token,
    };
  }
}
