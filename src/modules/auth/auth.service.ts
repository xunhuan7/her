import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async validateUser(id: string): Promise<any> {
    const user = await this.userService.findOneByParams({ id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async register(registerDTO: RegisterDTO): Promise<any> {
    const { email } = registerDTO;
    const isEmailUsed = await this.userService.findOneByParams({ email });
    if (isEmailUsed) {
      throw new BadRequestException('Account has been used!');
    }
    const { password } = await this.userService.signUp(registerDTO);
    return await this.logIn({ email, password });
  }

  async logIn(loginDTO: LoginDto): Promise<any> {
    const { email, password } = loginDTO;
    const result = await this.userService.findOneByParams({ email });
    if (!result) {
      throw new UnauthorizedException('Account does not exist!');
    }
    if (result.password !== password) {
      throw new UnauthorizedException('Wrong password!');
    }
    const { id } = result;
    const token = this.jwtService.sign({ id });
    return {
      token,
    };
  }

  async me(authorization: string): Promise<any> {
    authorization = (authorization || '').split(' ')[1];
    const id = this.jwtService.decode(authorization);
    const { password, ...myInfo } = await this.userService.findOneByParams(id);
    return myInfo;
  }

}
