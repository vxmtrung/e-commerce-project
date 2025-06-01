import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  shipping_address: string;
}
