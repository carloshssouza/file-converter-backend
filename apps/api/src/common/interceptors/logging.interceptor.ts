import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, params, query } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = Date.now();

    // Log da requisição
    this.logger.log(
      `[${method}] ${url} - Request:
      Body: ${JSON.stringify(body)}
      Params: ${JSON.stringify(params)}
      Query: ${JSON.stringify(query)}
      User-Agent: ${userAgent}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - startTime;
          this.logger.log(
            `[${method}] ${url} - Response (${responseTime}ms):
            Status: Success
            Data: ${JSON.stringify(data)}`,
          );
        },
        error: (error) => {
          const responseTime = Date.now() - startTime;
          this.logger.error(
            `[${method}] ${url} - Error (${responseTime}ms):
            Status: ${error.status || 500}
            Message: ${error.message}
            Stack: ${error.stack}`,
          );
        },
      }),
    );
  }
}
