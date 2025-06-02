import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @ApiProperty()
  product_id: string;

  @IsInt()
  @ApiProperty()
  quantity: number;

  constructor(product_id: string, quantity: number) {
    this.product_id = product_id;
    this.quantity = quantity;
  }
}
