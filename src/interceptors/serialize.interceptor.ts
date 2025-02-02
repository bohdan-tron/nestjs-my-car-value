import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

// dto interface to check if it is a class
interface ClassConstructor {
  new (...args: any[]): {}
}

// Custom Decorator
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Custom Interceptor
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // runs before a request is handled, context is the request object

    return handler.handle().pipe(
      map((data: any) => {
        // runs before the response is sent out
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        })
        
      })
    ) 
  }
}
