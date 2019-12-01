import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
  async save(user) {
    return 'Save 接口测试';
  }
}
