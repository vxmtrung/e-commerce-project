import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../../../constants/user-role.constant';
import { UserEntity } from '../../entities/user.entity';

export class UserInfoDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: Role;
  @ApiProperty()
  createAt: Date;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.username = userEntity.username;
    this.password = userEntity.password;
    this.role = userEntity.role;
    this.createAt = userEntity.createdAt;
  }
}
