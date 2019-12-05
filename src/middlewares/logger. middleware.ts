import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(request: Request, response: Response, next) {

    const now = moment(Date.now());
    console.info(now.format('YYYY/MM/DD hh:mm:ss'), request.method, `-> ${decodeURIComponent(request.originalUrl)}`);

    if (JSON.stringify(request.query) !== '{}') {
      console.info('queries:', request.query);
    }
    if (JSON.stringify(request.body) !== '{}') {
      console.info('body:', request.body);
    }

    next();

  }

}
