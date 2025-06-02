import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/constants/order-status.constant';

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  @ApiProperty()
  status: OrderStatus;

  constructor(status: OrderStatus) {
    this.status = status;
  }
}
