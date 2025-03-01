import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../modules/auth/interfaces/auth-payload.interface';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthPayload;
  },
);
