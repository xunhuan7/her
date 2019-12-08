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

  async updateMe(updateMeDTO, id) {
    for (const key in updateMeDTO) {
      if (key !== 'nickname' && key !== 'avatar' && key !== 'profile' && key !== 'password') {
        delete updateMeDTO[key];
      }
    }
    const me = await this.userRepository.findOne({ id });
    Object.assign(me, updateMeDTO);
    const updatedMe = await this.userRepository.save(me);
    delete updatedMe.password;
    return updatedMe;
  }

  async active(ids: string[]) {
    const users: User[] = await this.userRepository.findByIds(ids);
    users.map(item => {
      item.limit = false;
    });
    await this.userRepository.save(users);
    return { ids };
  }

  async forbidden(ids: string[]) {
    const users: User[] = await this.userRepository.findByIds(ids);
    users.map(item => {
      item.limit = true;
    });
    await this.userRepository.save(users);
    return { ids };
  }

  async findUsers(findUsersDTO): Promise<any> {
    const { page, pageSize } = findUsersDTO;
    const totalCount = await this.userRepository.count();
    const users = await this.userRepository.find(
      {
        order: {
          id: 'ASC',
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      },
    );
    users.map(item => delete item.password);
    return {
      totalCount,
      page,
      pageSize,
      data: users,
    };
  }

  async findOneByParams(params, needId: boolean = true): Promise<any> {
    if (needId) {
      return await this.userRepository.findOne({ ...params });
    } else {
      const user = await this.userRepository.findOne({ ...params });
      delete user.password;
      return user;
    }
  }

}
