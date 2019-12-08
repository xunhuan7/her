import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDTO } from '../auth/dto/register.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async signUp(registerDTO: RegisterDTO): Promise<any> {
    return await this.userRepository.save(registerDTO);
  }

  async deleteAll(): Promise<any> {
    return await this.userRepository.delete({});
  }

  async deleteOne(id): Promise<any> {
    return await this.userRepository.delete({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByParams(params): Promise<any> {
    return await this.userRepository.findOne({ ...params });
  }

}
