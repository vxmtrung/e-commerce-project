import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { UserLoginDto } from '../domains/dtos/requests/user-login.dto';
import { AccessToken } from '../domains/dtos/responses/token.dto';
import { IUserService } from '../../users/services/user.service';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface IAuthService {
  signIn(userLoginDto: UserLoginDto): Promise<AccessToken>;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, passwordHashed: string): Promise<boolean>;
}

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(forwardRef(() => 'IUserService'))
    private readonly userService: IUserService,
    private jwtService: JwtService
  ) {}

  async signIn(userLoginDto: UserLoginDto): Promise<any> {
    try {
      const userInfo = await this.userService.getUserByUsername(userLoginDto.username);

      const compare = await this.comparePassword(userLoginDto.password, userInfo.password);

      if (!compare) {
        throw new UnauthorizedException();
      }

      const payload = {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        username: userInfo.username,
        role: userInfo.role
      };

      const token = await this.jwtService.signAsync(payload);

      return {
        token: token,
        user: payload
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 13);
  }

  async comparePassword(password: string, passwordHashed: string): Promise<boolean> {
    return await compare(password, passwordHashed);
  }
}
