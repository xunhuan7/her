import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

import * as moment from 'moment';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || 500;
    const message = exception.message || null;

    response
      .status(status)
      .json({
        statusCode: status,
        ...message,
        timestamp: moment().format('YYYY/MM/DD hh:mm:ss'),
      });
  }

}
