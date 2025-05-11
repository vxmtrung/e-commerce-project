import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;

  constructor(name: string, email: string, phoneNumber: string, username: string, password: string) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.password = password;
  }
}
