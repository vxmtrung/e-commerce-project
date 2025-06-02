import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  shipping_address: string;

  constructor(shipping_address: string) {
    this.shipping_address = shipping_address;
  }
}
