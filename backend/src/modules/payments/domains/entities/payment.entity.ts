import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentMethod } from '../../../../constants/payment-method.constant';
import { PaymentStatus } from '../../../../constants/payment-status.constant';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  orderId: string;

  @Column({ nullable: false, default: PaymentMethod.CASH_ON_DELIVERY, type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ nullable: false, default: PaymentStatus.PENDING, type: 'enum', enum: PaymentStatus })
  paymentStatus: PaymentStatus;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;
}
