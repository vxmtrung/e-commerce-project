import { IsBoolean, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateProductInstanceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsUUID()
  productId: string;

  @IsBoolean()
  status: boolean;
}
