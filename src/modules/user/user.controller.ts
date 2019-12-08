import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from '../../guards/admin-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService) {
  }

  /**
   * @api {delete} /user 删除所有用户
   * @apiGroup UserModule
   */
  @Delete()
  @UseGuards(AdminAuthGuard)
  deleteAll() {
    return this.userService.deleteAll();
  }

  /**
   * @api {delete} /user/:id 根据id删除某个用户
   * @apiGroup UserModule
   */
  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

  /**
   * @api {get} /user 获取用户列表数据
   * @apiGroup UserModule
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   * [{
   *    "id": 10,
   *    "email": "jayden@jayden.com",
   *    "password": "326448",
   *    "nickname": "Jayden",
   *    "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%25E7%25BD%2597%25E6%25B0%25B8%25E6%25B5%25A9_%25E9%2594%25A4%25E5%25AD%2590%25E7%25A7%2591%25E6%258A%2580.jpg",
   *    "profile": "",
   *    "role": "editor",
   *    "limit": true,
   *    "createAt": "2019-12-05T21:22:56.756Z",
   *    "updatedAt": "2019-12-05T21:22:56.756Z"
   * },{
   *    "id": 11,
   *    "email": "jayden@geekpark.com",
   *    "password": "111111",
   *    "nickname": "Jayden",
   *    "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%25E7%25BD%2597%25E6%25B0%25B8%25E6%25B5%25A9_%25E9%2594%25A4%25E5%25AD%2590%25E7%25A7%2591%25E6%258A%2580.jpg",
   *    "profile": "",
   *    "role": "editor",
   *    "limit": true,
   *    "createAt": "2019-12-05T21:23:31.141Z",
   *    "updatedAt": "2019-12-05T21:23:31.141Z"
   * }]
   */
  @Get()
  @UseGuards(AdminAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  /**
   * @api {get} /user/:id 获取某位用户数据
   * @apiGroup UserModule
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   * {
   *    "id": 10,
   *    "email": "jayden@jayden.com",
   *    "password": "326448",
   *    "nickname": "Jayden",
   *    "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%25E7%25BD%2597%25E6%25B0%25B8%25E6%25B5%25A9_%25E9%2594%25A4%25E5%25AD%2590%25E7%25A7%2591%25E6%258A%2580.jpg",
   *    "profile": "",
   *    "role": "editor",
   *    "limit": true,
   *    "createAt": "2019-12-05T21:22:56.756Z",
   *    "updatedAt": "2019-12-05T21:22:56.756Z"
   * }
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneByParams({id});
  }

}
