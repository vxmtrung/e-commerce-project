import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  product_id: string;

  @IsInt()
  quantity: number;
}