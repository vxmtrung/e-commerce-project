import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUUID } from 'class-validator';

export class UpdateProductImgDto {
  @ApiProperty()
  @IsUUID()
  productInstanceId: string;

  @ApiProperty()
  @IsString()
  link: string;

  @ApiProperty()
  @IsBoolean()
  status: boolean;
}
