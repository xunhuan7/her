import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as APP_CONFIG from './app.config';

import { LoggerMiddleware } from './middlewares/logger. middleware';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: APP_CONFIG.MYSQL.HOST,
      port: APP_CONFIG.MYSQL.PORT,
      username: APP_CONFIG.MYSQL.USERNAME,
      password: APP_CONFIG.MYSQL.PASSWORD,
      database: APP_CONFIG.MYSQL.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    BlogModule,
  ],
})

export class AppModule implements NestModule {

  constructor(private readonly connection: Connection) {
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
