import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateProductImgDto {
  @ApiProperty()
  @IsUUID()
  productInstanceId: string;

  @ApiProperty()
  @IsString()
  link: string;
}
