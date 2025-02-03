import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (
    data: never, // data is the name of the parameter in the decorator
    context: ExecutionContext, // context is the execution context
  ) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser; // this is the current user that is set in the interceptor
  },
);

