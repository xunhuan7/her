import { Post, Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login..dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  /**
   * @api {post} /auth/register 用户注册
   * @apiGroup AuthModule
   *
   * @apiParam {String} email 用户邮箱
   * @apiParam {String} password 用户密码，至少6位
   * @apiParam {String} nickname 用户昵称
   * @apiParam {String} [avatar] 用户头像URL
   * @apiParam {String} [profile] 用户主页介绍
   * @apiParam {String} [roles] 用户权限
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *     {
   *       "nickname": "Jayden",
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ2ZmZmZkAy5ZWlMjIyMi5jb20iLCJpYXQiOjE1NzU1Nzg4NDMsImV4cCI6MTU3NjE4MzY0M30.U_mDsAb3xNGCYZd2zLJkfEAH-6WKT7P1PAKGifCc-YY"
   *     }
   */
  @Post('/register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  /**
   * @api {post} /auth/login 用户登录
   * @apiGroup AuthModule
   *
   * @apiParam {String} email 用户邮箱
   * @apiParam {String} password 用户密码
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *     {
   *       "nickname": "Jayden",
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ2ZmZmZkAy5ZWlMjIyMi5jb20iLCJpYXQiOjE1NzU1Nzg4NDMsImV4cCI6MTU3NjE4MzY0M30.U_mDsAb3xNGCYZd2zLJkfEAH-6WKT7P1PAKGifCc-YY"
   *     }
   */
  @Post('/login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

}
