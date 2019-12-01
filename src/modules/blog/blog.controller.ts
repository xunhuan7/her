import { Controller, Body, Param, UseGuards, Get, Post, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly userService: BlogService) {
  }

  @Get()
  save(@Body() saveDTO) {
    return this.userService.save(saveDTO);
  }
}
