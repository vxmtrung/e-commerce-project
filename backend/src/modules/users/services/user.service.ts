import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserInfoDto } from "../domains/dtos/responses/user-info.dto";
import { IUserRepository } from "../repositories/user.repository";

export interface IUserService {
  getUserByUsername(username: string): Promise<UserInfoDto>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async getUserByUsername(username: string): Promise<UserInfoDto> {
      try { 
        const user = await this.userRepository.findUserByUsername(username);

        if (!user) {
          throw new NotFoundException(`The user with username ${username} is not found`);
        }

        return new UserInfoDto(user);
      } catch (error) {
        if (error instanceof HttpException) { 
          throw error;
        } else {
          throw new InternalServerErrorException(error);
        }
      }
  }
}