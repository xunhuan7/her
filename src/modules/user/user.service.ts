import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { SaveDTO } from './dto/save.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async save(user: SaveDTO): Promise<User> {
    return await this.userRepository.save(user);
  }

  async deleteOne(id): Promise<any> {
    return await this.userRepository.delete({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id): Promise<any> {
    return await this.userRepository.findOne({ id });
  }

  async findOneByEmail(email) {
    return await this.userRepository.findOne({ email });
  }
}
