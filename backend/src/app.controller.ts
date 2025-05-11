import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { PublicRoute } from './decorators/public-route.decorator';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicRoute()
  @ApiResponse({
    status: 200,
    description: 'Success Response',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
