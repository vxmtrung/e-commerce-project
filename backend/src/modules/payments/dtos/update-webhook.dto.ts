import { PaymentStatus } from 'src/constants/payment-status.constant';

export class UpdateWebhookDto {
  id: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  code: string;
  content: string;
  transferType: string;
  transferAmount: number;
  accumulated: number;
  subAccount: string;
  referenceCode: string;
  description: string;
}
