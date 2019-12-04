import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0',
      database: 'Her',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    AuthModule,
    UserModule,
    BlogModule,
  ],
})

export class AppModule {

  constructor(private readonly connection: Connection) {
  }

}
