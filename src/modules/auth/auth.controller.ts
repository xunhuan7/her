import { Get, Post, Controller, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login..dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {
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
   *        "id": 14,
   *       "nickname": "Jay",
   *       "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%E7%BD%97%E6%B0%B8%E6%B5%A9_%E9%94%A4%E5%AD%90%E7%A7%91%E6%8A%80.jpg",
   *       "profile": "I am a programmer",
   *       "roles": "editor",
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ2ZmZmZkAy5ZWlMjIyMi5jb20iLCJpYXQiOjE1NzU1Nzg4NDMsImV4cCI6MTU3NjE4MzY0M30.U_mDsAb3xNGCYZd2zLJkfEAH-6WKT7P1PAKGifCc-YY"
   *     }
   */
  @Post('/register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  /**
   * @api {post} /auth 用户登录
   * @apiGroup AuthModule
   *
   * @apiParam {String} email 用户邮箱
   * @apiParam {String} password 用户密码
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 14,
   *       "email": "dengqiyao@geekpark.net",
   *       "nickname": "Jay",
   *       "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%E7%BD%97%E6%B0%B8%E6%B5%A9_%E9%94%A4%E5%AD%90%E7%A7%91%E6%8A%80.jpg",
   *       "profile": "I am a programmer",
   *       "roles": "editor",
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ2ZmZmZkAy5ZWlMjIyMi5jb20iLCJpYXQiOjE1NzU1Nzg4NDMsImV4cCI6MTU3NjE4MzY0M30.U_mDsAb3xNGCYZd2zLJkfEAH-6WKT7P1PAKGifCc-YY"
   *     }
   */
  @Post()
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  /**
   * @api {post} /auth/me 当前已登录用户信息
   * @apiGroup AuthModule
   *
   * @apiParam {String} authorization Header参数：Bearer token
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": 14,
   *       "email": "dengqiyao@geekpark.net",
   *       "nickname": "Jay",
   *       "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%E7%BD%97%E6%B0%B8%E6%B5%A9_%E9%94%A4%E5%AD%90%E7%A7%91%E6%8A%80.jpg",
   *       "profile": "I am a programmer",
   *       "roles": "editor",
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ2ZmZmZkAy5ZWlMjIyMi5jb20iLCJpYXQiOjE1NzU1Nzg4NDMsImV4cCI6MTU3NjE4MzY0M30.U_mDsAb3xNGCYZd2zLJkfEAH-6WKT7P1PAKGifCc-YY"
   *     }
   */
  @Get('me')
  me(@Headers('authorization') authorization: string) {
    return this.authService.me(authorization);
  }
}
