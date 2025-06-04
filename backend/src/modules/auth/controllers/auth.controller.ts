import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthService } from '../services/auth.service';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { UserLoginDto } from '../domains/dtos/requests/user-login.dto';
// import { AccessToken } from '../domains/dtos/responses/token.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService
  ) {}

  @PublicRoute()
  @Post('login')
  @ApiBody({
    type: UserLoginDto
  })
  @ApiResponse({
    status: 201,
    description: 'Login Success',
    example: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
      user: {
        id: '55c08693-e812-432c-b0a0-dc19358a76ea',
        name: 'test',
        email: 'admin@email.com',
        username: 'admin1',
        role: 'USER'
      }
    }
  })
  signIn(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.signIn(userLoginDto);
  }
}
