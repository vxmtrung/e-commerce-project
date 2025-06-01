import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ProductItemDto } from './product-item.dto';
import { PaymentMethod } from 'src/constants/payment-method.constant';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  backupPhone: string;

  @IsNotEmpty()
  @ApiProperty()
  data: ProductItemDto[];

  @IsNotEmpty()
  @ApiProperty()
  discount: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  @ApiProperty()
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  receiverName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  receiverPhone: string;

  @IsNotEmpty()
  @ApiProperty()
  subtotal: number;

  @IsNotEmpty()
  @ApiProperty()
  total: number;
}
