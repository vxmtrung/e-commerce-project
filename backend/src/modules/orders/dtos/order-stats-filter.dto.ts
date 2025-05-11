import { IsDateString, IsOptional } from 'class-validator';

export class OrderStatsFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
