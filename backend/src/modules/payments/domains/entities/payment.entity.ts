import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "../../../../constants/payment-method.constant";
import { PaymentStatus } from "../../../../constants/payment-status.constant";

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  orderId: string;

  @Column({ nullable: false })
  paymentMethod: PaymentMethod;

  @Column({ nullable: false, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ nullable: false })
  amount: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}