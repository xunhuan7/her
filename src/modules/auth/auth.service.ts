import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as APP_CONFIG from '../../app.config';
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

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
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
    const result = await this.userService.findOneByEmail(email);
    if (!result) {
      throw new UnauthorizedException('Account does not exist!');
    }
    if (result.password !== password) {
      throw new UnauthorizedException('Wrong password!');
    }
    const { id, nickname, avatar, profile, roles } = result;
    const token = this.jwtService.sign({ id, nickname });
    return {
      id,
      email,
      nickname,
      avatar,
      profile,
      roles,
      token,
    };
  }

  async me(authorization): Promise<any> {
    authorization = authorization.split(' ')[1];
    const { id } = this.jwtService.decode(authorization);
    const { password, ...me } = await this.userService.findOne(id);
    return me;
  }
}
