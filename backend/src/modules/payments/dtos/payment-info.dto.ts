import { PaymentStatus } from 'src/constants/payment-status.constant';

export class PaymentInfoDto {
  orderId: string;
  amount: number;
  paymentStatus: PaymentStatus;
}
