import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request } from 'express';

export const UUIDParam = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const value = request.params[key];

  if (!isUUID(value)) {
    throw new BadRequestException(`Invalid UUID format for param: ${key}`);
  }

  return value;
});
