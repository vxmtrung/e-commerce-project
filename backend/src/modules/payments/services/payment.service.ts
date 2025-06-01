import { Injectable, Inject } from '@nestjs/common';
import { IPaymentRepository } from '../repositories/payment.repository';
import { PaymentEntity } from '../domains/entities/payment.entity';
import { PaymentStatus } from 'src/constants/payment-status.constant';
import { PaymentInfoDto } from '../dtos/payment-info.dto';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';
import { UpdateWebhookDto } from '../dtos/update-webhook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface IPaymentService {
    updatePaymentStatus(updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity>;
    getPaymentStatus(orderId: string): Promise<PaymentInfoDto>;
    updatePaymentStatusByWebhook(updateWebHook: UpdateWebhookDto): Promise<PaymentInfoDto>;
}

@Injectable()
export class PaymentService implements IPaymentService {
    constructor(
        @InjectRepository(PaymentEntity)
        private paymentRepository: Repository<PaymentEntity>
    ) {}

    async updatePaymentStatus(updatePaymentDto: UpdatePaymentDto): Promise<PaymentEntity> {
        const orderId = updatePaymentDto.orderId;
        const payment = await this.paymentRepository.findOne({ where: { orderId } });
        if (!payment) {
            throw new Error('Payment not found');
        }
    
        payment.paymentStatus = updatePaymentDto.newStatus;
        return this.paymentRepository.save(payment);
    }

    async getPaymentStatus(orderId: string): Promise<PaymentInfoDto> {
        const payment = await this.paymentRepository.findOne({ where: { orderId } });
        if (!payment) {
            throw new Error('Payment not found');
        }
        return payment;
    }

    async updatePaymentStatusByWebhook(updateWebHook: UpdateWebhookDto): Promise<PaymentInfoDto> {
        const orderIds = updateWebHook.content.split(' ');
        for (const orderId of orderIds) {
            try {
                const payment = await this.paymentRepository.findOne({ where: { orderId } });
                if (!payment) {
                    throw new Error('Payment not found');
                }

                if (updateWebHook.transferAmount === payment.amount) {
                    payment.paymentStatus = PaymentStatus.COMPLETED;
                }
                else {
                    payment.paymentStatus = PaymentStatus.FAILED;
                }

                await this.paymentRepository.save(payment);

                return {
                    orderId: payment.orderId,
                    amount: payment.amount,
                    paymentStatus: payment.paymentStatus
                };
            }
            catch(e) {};
        }
        return null;
    }
}