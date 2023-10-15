// trace-id.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as uuid from 'uuid';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const traceId = req.header('x-trace-id') || uuid.v4();
    req.headers['x-trace-id'] = traceId;
    next();
  }
}
