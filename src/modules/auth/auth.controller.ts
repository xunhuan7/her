import { Post, Controller, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  login(@Body() authDto) {
    return this.authService.login(authDto);
  }
}
