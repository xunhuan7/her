import { Post, Delete, Put, Get, Controller, Param, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { BlogService } from './blog.service';

import { SaveDTO } from './blog.dto';

@Controller('blog')
export class BlogController {

  constructor(private readonly blogService: BlogService) {
  }

  @Post()
  save(@Body() saveDTO: SaveDTO) {
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
  findOne(@Param('id') id) {
    return id;
  }

}
