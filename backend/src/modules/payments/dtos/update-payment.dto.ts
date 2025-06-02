import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { PaymentStatus } from 'src/constants/payment-status.constant';

export class UpdatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  orderId: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @ApiProperty()
  newStatus: PaymentStatus;

  constructor(orderId: string, newStatus: PaymentStatus) {
    this.orderId = orderId;
    this.newStatus = newStatus;
  }
}
