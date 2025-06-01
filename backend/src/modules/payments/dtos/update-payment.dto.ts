import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { PaymentStatus } from 'src/constants/payment-status.constant';

export class UpdatePaymentDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  newStatus: PaymentStatus;
}
