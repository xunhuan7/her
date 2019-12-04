import { Post, Delete, Put, Get, Controller, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';

import { SaveDto } from './dto/save.dto';

@Controller('blog')
export class BlogController {

  constructor(private readonly blogService: BlogService) {
  }

  @Post()
  save(@Body() saveDTO: SaveDto) {
    return this.blogService.save(saveDTO);
  }

  @Delete()
  deleteMany(@Body() body) {

  }

  @Delete(':id')
  deleteOne(@Body() params) {

  }

  @Put(':id')
  updateOne(@Param('id') id) {

  }

  @Get()
  findAll() {
    return '';
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id) {
    return id;
  }

}
