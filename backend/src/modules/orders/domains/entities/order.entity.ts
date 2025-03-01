import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderStatus } from "../../../../constants/order-status.constant";

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  status: OrderStatus;

  @Column({ nullable: false })
  shippingAddress: string;

  @Column({ nullable: false })
  userId: string;

  @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;
  
  @UpdateDateColumn({
      type: 'timestamp',
    })
    updatedAt: Date;
  
  @DeleteDateColumn({
      type: 'timestamp',
    })
    deletedAt: Date;
}