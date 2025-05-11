import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  status: boolean;
}
