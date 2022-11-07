import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Header } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// import { classToPlain } from 'class-transformer';

@Injectable()
export class GeneralInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    console.log("GeneralInterceptor ****************************");

    return next
      .handle()
      .pipe(
        tap((data) => {
          request.res.header('x-api-key', 'Pretty secure!');
          // if (Array.isArray(data)) {
          //   return data.map(dat => {
          //     if (dat.password) dat.password = '@@@@@@@@@@@@@';
          //     return dat;
          //   })
          // }
          // if (data.password) data.password = '@@@@@@@@@@@@@';
          return data;
        })
      );
  }
}

