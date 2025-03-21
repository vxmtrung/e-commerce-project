import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface Filtering {
  property: string;
  rule: string;
  value: string;
}

// valid filter rules
export enum FilterRule {
  EQUALS = 'eq',
  NOT_EQUALS = 'neq',
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUALS = 'lte',
  LIKE = 'like',
  NOT_LIKE = 'nlike',
  IN = 'in',
  NOT_IN = 'nin',
  IS_NULL = 'isnull',
  IS_NOT_NULL = 'isnotnull'
}

export const FilteringParams = createParamDecorator((data, ctx: ExecutionContext): Filtering[] => {
  const req: Request = ctx.switchToHttp().getRequest();
  const filters = req.query.filter as string | string[];
  console.log(filters);
  if (!filters) return [];

  const parsedFilters: Filtering[] = [];

  const filterArray = Array.isArray(filters) ? filters : [filters]; // Đảm bảo filter là mảng
  for (const filter of filterArray) {
    if (
      !filter.match(/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,-]+$/) &&
      !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
    ) {
      throw new BadRequestException('Invalid filter parameter');
    }

    const [rawProperty, rule, value] = filter.split(':');

    const property = rawProperty.replace(/([a-zA-Z0-9_-]+)id$/, (_, match) => match + 'Id');

    if (!data.includes(property)) throw new BadRequestException(`Invalid filter property: ${property}`);
    if (!Object.values(FilterRule).includes(rule as FilterRule))
      throw new BadRequestException(`Invalid filter rule: ${rule}`);

    parsedFilters.push({ property, rule, value });
  }

  return parsedFilters;
});
