import { ApiProperty } from '@nestjs/swagger';
import { DiscountType } from '../../../../constants/discount-type.constant';

export class CreateVoucherDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  discountType: DiscountType;

  @ApiProperty()
  discountValue: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;
}
