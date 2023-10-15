import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, traceId: string, statusCode: HttpStatus) {
    const customResponse = {
      data: {},
      traceId,
      statusCode,
      notification: message,
    };
    super(customResponse, statusCode);
  }
}
