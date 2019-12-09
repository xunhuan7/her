import { Controller, Get, Post, Delete, Body, Param, UseGuards, Put, Query } from '@nestjs/common';
import { AdminAuthGuard } from '../../guards/admin-auth.guard';
import { EditorAuthGuard } from '../../guards/editor-auth.guard';
import { Me } from '../../decorators/me.decorator';
import { UserService } from './user.service';
import { FindUsersDTO } from './dto/find-users.dto';
import { UpdateMeDTO } from './dto/update-me.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService) {
  }

  /**
   * @api {put} /user 用户更新个人信息
   * @apiGroup UserModule
   *
   * @apiParam {String} [nickname] 用户昵称
   * @apiParam {String} [avatar] 用户头像URL
   * @apiParam {String} [profile] 用户主页介绍
   * @apiParam {String} [password] 用户密码
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *      {
   *        "id": 17,
   *        "email": "dqy676081195@gmail.com",
   *        "nickname": "new_J",
   *        "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%25E7%25BD%2597%25E6%25B0%25B8%25E6%25B5%25A9_%25E9%2594%25A4%25E5%25AD%2590%25E7%25A7%2591%25E6%258A%2580.jpg",
   *        "profile": "",
   *        "role": "admin",
   *        "limit": false,
   *        "createAt": "2019-12-08T14:04:11.493Z",
   *        "updatedAt": "2019-12-08T17:46:40.000Z"
   *    }
   */
  @Put()
  @UseGuards(EditorAuthGuard)
  updateMe(@Body() updateMeDTO: UpdateMeDTO, @Me('id') id: string) {
    return this.userService.updateMe(updateMeDTO, id);
  }

  /**
   * @api {put} /user/active 管理员激活任意个用户
   * @apiGroup UserModule
   *
   * @apiParam {Array} ids 用户id数组,[1,2,3]
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *     {
   *      "ids": [ 1,2,3 ]
   *     }
   */
  @Put('active')
  @UseGuards(AdminAuthGuard)
  active(@Body('ids') ids: string[]) {
    return this.userService.active(ids);
  }

  /**
   * @api {put} /user/forbidden 管理员禁用任意个用户
   * @apiGroup UserModule
   *
   * @apiParam {Array} ids 用户id数组,[1,2,3]
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *     {
   *      "ids": [ 1,2,3 ]
   *     }
   */
  @Put('forbidden')
  @UseGuards(AdminAuthGuard)
  forbidden(@Body('ids') ids: string[]) {
    return this.userService.forbidden(ids);
  }

  /**
   * @api {get} /user 获取用户列表数据
   * @apiGroup UserModule
   *
   * @apiParam {String} [page] 第几页
   * @apiParam {String} [pageSize] 每页数量
   * @apiParam {String} [role] 用户角色：'admin' | 'editor' | 'ghost'
   *
   * @apiSuccessExample 返回数据:
   *     HTTP/1.1 200 OK
   *  {
   *  "totalCount": 2,
   *  "page": 1,
   *  "pageSize": 1,
   *  "data": [
   *      {
   *        "id": 17,
   *        "email": "dqy676081195@gmail.com",
   *        "nickname": "Jayden",
   *        "avatar": "https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%25E7%25BD%2597%25E6%25B0%25B8%25E6%25B5%25A9_%25E9%2594%25A4%25E5%25AD%2590%25E7%25A7%2591%25E6%258A%2580.jpg",
   *        "profile": "",
   *        "role": "admin",
   *        "limit": false,
   *        "createAt": "2019-12-08T14:04:11.493Z",
   *        "updatedAt": "2019-12-08T17:46:40.000Z"
   *    }
   *  ]
   *  }
   */
  @Get()
  findUsers(@Query() findUsersDTO: FindUsersDTO) {
    return this.userService.findUsers(findUsersDTO);
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
    return this.userService.findOneByParams({ id }, false);
  }

}
