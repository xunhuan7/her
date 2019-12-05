import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login..dto';

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

  async register(registerDTO: RegisterDTO): Promise<any> {
    const isEmailUsed = await this.userService.findOneByEmail(registerDTO.email);
    if (isEmailUsed) {
      throw new BadRequestException('Account has been used!');
    }
    const { email, password } = await this.userService.signUp(registerDTO);
    return await this.login({ email, password });
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const { email, password } = loginDTO;
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
