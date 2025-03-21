import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { Request } from 'express';

export const UUIDQuery = createParamDecorator((key: string, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const value = request.query[key];

  if (!value || !isUUID(value)) {
    throw new BadRequestException(`Invalid UUID format for query param: ${key}`);
  }

  return value;
});
