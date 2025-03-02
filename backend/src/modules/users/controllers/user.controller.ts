import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUserService } from '../services/user.service';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { CreateUserDto } from '../domains/dtos/requests/create-user.dto';
import { UserInfoDto } from '../domains/dtos/responses/user-info.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService
  ) {}

  @PublicRoute()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserInfoDto> {
    console.log(createUserDto);

    return this.userService.createUser(createUserDto);
  }
}
