import {
  ConflictException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { UserInfoDto } from '../domains/dtos/responses/user-info.dto';
import { IUserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../domains/dtos/requests/create-user.dto';
import { IAuthService } from '../../auth/services/auth.service';

export interface IUserService {
  getUserByUsername(username: string): Promise<UserInfoDto>;
  createUser(creatUserDto: CreateUserDto): Promise<UserInfoDto>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject(forwardRef(() => 'IAuthService'))
    private readonly authService: IAuthService
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

  async createUser(createUserDto: CreateUserDto): Promise<UserInfoDto> {
    try {
      const user = await this.userRepository.findUserByUsername(createUserDto.username);

      if (user) {
        throw new ConflictException(`The username ${createUserDto.username} was used`);
      }

      const hashedPassword = await this.authService.hashPassword(createUserDto.password);

      const newUser = await this.userRepository.createUser({ ...createUserDto, password: hashedPassword });

      return new UserInfoDto(newUser);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
