import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { IPaymentService } from '../services/payment.service';
import { PaymentInfoDto } from '../dtos/payment-info.dto';
import { PaymentEntity } from '../domains/entities/payment.entity';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';
import { UpdateWebhookDto } from '../dtos/update-webhook.dto';

@Controller('payments')
export class PaymentController {
    constructor(
        @Inject('IPaymentService')
        private readonly paymentService: IPaymentService
    ) {}

    @Get(":orderId")
    getPaymentStatus(@Body() orderId: string): Promise<PaymentInfoDto> {
        return this.paymentService.getPaymentStatus(orderId);
    }

    @Post(":orderId")
    updatePaymentStatus(@Body() updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity> {
        return this.paymentService.updatePaymentStatus(updatePaymentDto);
    }

    @Post("hooks/update/payment-status")
    updatePaymentStatusByWebhook(@Body() updateWebHook: UpdateWebhookDto): Promise<PaymentInfoDto> {
        return this.paymentService.updatePaymentStatusByWebhook(updateWebHook);
    }
}