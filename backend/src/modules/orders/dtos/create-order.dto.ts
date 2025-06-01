import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductItemDto } from './product-item.dto';
import { PaymentMethod } from 'src/constants/payment-method.constant';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  backupPhone: string;

  @IsNotEmpty()
  data: ProductItemDto[];

  @IsNotEmpty()
  discount: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsString()
  receiverName: string;

  @IsNotEmpty()
  @IsString()
  receiverPhone: string;

  @IsNotEmpty()
  subtotal: number;

  @IsNotEmpty()
  total: number;
}
