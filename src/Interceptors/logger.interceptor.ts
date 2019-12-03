import { Injectable, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {

    const request = context.switchToHttp().getRequest();
    const now = moment(Date.now());

    console.info(now.format('YYYY/MM/DD hh:mm:ss'), request.method, `-> ${decodeURIComponent(request.originalUrl)}`);

    if (JSON.stringify(request.query) !== '{}') {
      console.info('queries:', request.query);
    }

    if (JSON.stringify(request.body) !== '{}') {
      console.info('body:', request.body);
    }

    return next
      .handle()
      .pipe(
        tap(() => console.info(`It takes ${Date.now() - now.valueOf()} ms\n`)),
      );
  }

}
