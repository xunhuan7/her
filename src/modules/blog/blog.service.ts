import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Blog } from './blog.entity';
import { SaveDto } from './dto/save.dto';

@Injectable()
export class BlogService {

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {
  }

  async save(saveDTO: SaveDto) {
    return await this.blogRepository.save(saveDTO);
  }

  async findAll(user): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

}
