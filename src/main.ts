import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as helmet from 'helmet';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser';

import { HttpExceptionFilter } from './filters/http-exception.filter';

import { ValidationPipe } from './pipes/validation.pipe';

import { LoggerInterceptor } from './Interceptors/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json({ limit: '100kb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(rateLimit({ windowMs: 10 * 60 * 1000, max: 100 }));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new LoggerInterceptor());

  await app.listen(3000);
}

bootstrap().then();
