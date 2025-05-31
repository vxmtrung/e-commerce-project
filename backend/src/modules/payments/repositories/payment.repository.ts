import { Repository } from 'typeorm';
import { PaymentEntity } from '../domains/entities/payment.entity';

export interface IPaymentRepository extends Repository<PaymentEntity> {}