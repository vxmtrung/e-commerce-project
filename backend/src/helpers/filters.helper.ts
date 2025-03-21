import {
  IsNull,
  Not,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  ILike,
  In,
  FindOptionsWhere
} from 'typeorm';
import { Filtering, FilterRule } from '../decorators/filtering-params.decorator';
import { Sorting } from '../decorators/sorting-params.decorator';

export const getOrder = (sort: Sorting) => (sort ? { [sort.property]: sort.direction } : {});

export const getWhere = (filters: Filtering[]): FindOptionsWhere<any> => {
  if (!filters || filters.length === 0) return {};

  return filters.reduce((where, filter) => {
    if (!filter.property || !filter.rule) return where;

    switch (filter.rule) {
      case FilterRule.IS_NULL:
        where[filter.property] = IsNull();
        break;
      case FilterRule.IS_NOT_NULL:
        where[filter.property] = Not(IsNull());
        break;
      case FilterRule.EQUALS:
        where[filter.property] = filter.value;
        break;
      case FilterRule.NOT_EQUALS:
        where[filter.property] = Not(filter.value);
        break;
      case FilterRule.GREATER_THAN:
        where[filter.property] = MoreThan(filter.value);
        break;
      case FilterRule.GREATER_THAN_OR_EQUALS:
        where[filter.property] = MoreThanOrEqual(filter.value);
        break;
      case FilterRule.LESS_THAN:
        where[filter.property] = LessThan(filter.value);
        break;
      case FilterRule.LESS_THAN_OR_EQUALS:
        where[filter.property] = LessThanOrEqual(filter.value);
        break;
      case FilterRule.LIKE:
        where[filter.property] = ILike(`%${filter.value}%`);
        break;
      case FilterRule.NOT_LIKE:
        where[filter.property] = Not(ILike(`%${filter.value}%`));
        break;
      case FilterRule.IN:
        where[filter.property] = In(filter.value.split(','));
        break;
      case FilterRule.NOT_IN:
        where[filter.property] = Not(In(filter.value.split(',')));
        break;
    }

    return where;
  }, {} as FindOptionsWhere<any>);
};
