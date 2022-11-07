import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("HttpException +++++++++++++++++++++");
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // let origin = request.headers['origin'] || request.headers['Origin'];
    // console.log('Exceptions=======', origin);

    // request.res.header('Access-Control-Allow-Origin', '*');
    // request.res.header('Access-Control-Allow-Headers', 'Content-Type');

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}