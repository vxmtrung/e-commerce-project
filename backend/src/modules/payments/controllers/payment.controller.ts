import { Controller, Get, Post, Body, Inject, Param } from '@nestjs/common';
import { IPaymentService } from '../services/payment.service';
import { PaymentInfoDto } from '../dtos/payment-info.dto';
import { PaymentEntity } from '../domains/entities/payment.entity';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';
import { UpdateWebhookDto } from '../dtos/update-webhook.dto';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('payments')
export class PaymentController {
  constructor(
    @Inject('IPaymentService')
    private readonly paymentService: IPaymentService
  ) {}

  @PublicRoute()
  @Get('test')
  test(): string {
    return 'hello world';
  }

  @Get('status/:orderId')
  getPaymentStatus(@Param('orderId') orderId: string): Promise<PaymentInfoDto> {
    return this.paymentService.getPaymentStatus(orderId);
  }

  @Post('update')
  @ApiBody({
    type: UpdatePaymentDto
  })
  @ApiResponse({
    status: 201,
    description: 'Update Payment Successfully',
    example: PaymentEntity
  })
  updatePaymentStatus(@Body() updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity> {
    return this.paymentService.updatePaymentStatus(updatePaymentDto);
  }

  @PublicRoute()
  @Post('hooks/update/payment-status')
  updatePaymentStatusByWebhook(@Body() updateWebHook: UpdateWebhookDto): Promise<PaymentInfoDto> {
    return this.paymentService.updatePaymentStatusByWebhook(updateWebHook);
  }
}
