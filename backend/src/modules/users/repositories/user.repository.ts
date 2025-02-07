import { Injectable } from "@nestjs/common";
import { UserEntity } from "../domains/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export interface IUserRepository {
  findUserByUsername(
    username: string,
    relations?: string[],
  ): Promise<UserEntity | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  
  async findUserByUsername(username: string, relations?: string[]): Promise<UserEntity | null> {
      const user = this.userRepository.findOne({
        where: {
          username: username,
        },
        relations: relations,
      });

      return user;
  }
}