import { IsString, IsUUID } from 'class-validator';

export class CreateProductImgDto {
  @IsUUID()
  productInstanceId: string;

  @IsString()
  link: string;
}
