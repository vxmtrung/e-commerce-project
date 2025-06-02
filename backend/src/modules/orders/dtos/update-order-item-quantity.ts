import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateOrderItemQuantityDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  quantity: number;

  constructor(quantity: number) {
    this.quantity = quantity;
  }
}
