import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomException } from './exception';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const traceId = request.headers['x-trace-id'];

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          traceId,
          status: response.statusCode,
          notification: null,
        };
      }),
      catchError((error) => {
        if (error instanceof BadRequestException) {
          const exception = error.getResponse() as any;
          const customException = new CustomException(
            exception.message,
            traceId,
            HttpStatus.BAD_REQUEST,
          );
          response
            .status(exception.statusCode)
            .json(customException.getResponse());
        } else if (error instanceof CustomException) {
          const exception = error.getResponse() as any;

          response.status(exception.statusCode).json(exception);
        } else {
          response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            data: {},
            traceId,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            notification: error.message,
          });
        }
        return throwError(error);
      }),
    );
  }
}
