import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IUserService } from '../services/user.service';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { CreateUserDto } from '../domains/dtos/requests/create-user.dto';
import { UserInfoDto } from '../domains/dtos/responses/user-info.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService
  ) {}

  @PublicRoute()
  @Post()
  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    status: 201,
    type: UserInfoDto,
    description: 'Create User Success'
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserInfoDto> {
    console.log(createUserDto);

    return this.userService.createUser(createUserDto);
  }
}
