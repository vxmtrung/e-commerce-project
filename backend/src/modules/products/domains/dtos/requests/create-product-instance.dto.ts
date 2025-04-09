import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateProductInstanceDto {
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
}
