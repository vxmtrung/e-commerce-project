import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  productId: string;

  @Column({ nullable: false })
  orderId: string;

  @Column({ nullable: false, default: 1 })
  quantity: number;
}