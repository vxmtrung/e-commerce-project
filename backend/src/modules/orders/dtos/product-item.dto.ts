import { IsNotEmpty, IsString } from 'class-validator';

export class ProductItemDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  initialPrice: number;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  quantity: number;
}