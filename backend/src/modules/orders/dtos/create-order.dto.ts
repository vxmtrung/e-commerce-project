import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/order-status.constant';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  shipping_address: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}