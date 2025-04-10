import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdateProductImgDto {
  @IsUUID()
  productInstanceId: string;

  @IsString()
  link: string;

  @IsBoolean()
  status: boolean;
}
