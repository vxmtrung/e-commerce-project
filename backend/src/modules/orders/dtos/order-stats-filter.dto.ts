import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class OrderStatsFilterDto {
  @IsOptional()
  @IsDateString()
  @ApiProperty()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  endDate?: string;

  constructor(startDate: string, endDate: string) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
