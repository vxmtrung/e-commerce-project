import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
