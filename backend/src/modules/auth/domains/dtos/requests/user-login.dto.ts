import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @ApiProperty()
  username: string;
  @IsString()
  @ApiProperty()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
