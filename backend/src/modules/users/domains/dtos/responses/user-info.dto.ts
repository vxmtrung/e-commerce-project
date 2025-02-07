import { Role } from "../../../../../constants/user-role.constant";
import { UserEntity } from "../../entities/user.entity";

export class UserInfoDto {
  id: string;
  name: string;
  username: string;
  password: string;
  role: Role;
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