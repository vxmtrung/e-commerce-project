import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUUID()
  categoryId: string;

  @IsUUID()
  brandId: string;

  @IsBoolean()
  status: boolean;
}
