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

  constructor(
    brand: string, description: string, image: string,
    initialPrice: number, key: string, price: number,
    productName: string, quantity: number
  ) {
    this.brand = brand;
    this.description = description;
    this.image = image;
    this.initialPrice = initialPrice;
    this.key = key;
    this.price = price;
    this.productName = productName;
    this.quantity = quantity;
  }
}