import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

import { SaveDTO } from './dto/save.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService) {
  }

  /**
   * @api {get} /user/:id Get User information
   * @apiVersion 0.1.0
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
  @Post()
  save(@Body() saveDTO: SaveDTO) {
    return this.userService.save(saveDTO);
  }

  @Delete(':id')
  drop(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
