import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @ApiProperty()
  product_id: string;

  @IsInt()
  @ApiProperty()
  quantity: number;
}
