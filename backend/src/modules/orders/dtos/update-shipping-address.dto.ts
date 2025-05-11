import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  shipping_address: string;
}
