import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./domains/entities/order.entity";
import { OrderItemEntity } from "./domains/entities/order-item.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { Repository } from "typeorm";
import { ProductModule } from "../products/product.module";
import { PaymentEntity } from "../payments/domains/entities/payment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, PaymentEntity]),
    ProductModule
  ],
  controllers: [OrderController],
  exports: ['IOrderService', 'IOrderRepository', 'IOrderItemRepository', 'IPaymentRepository'],
  providers: [
    {
      provide: 'IOrderService',
      useClass: OrderService
    },
    {
      provide: 'IOrderRepository',
      useClass: Repository<OrderEntity>
    },
    {
      provide: 'IOrderItemRepository',
      useClass: Repository<OrderItemEntity>
    },
    {
      provide: 'IPaymentRepository',
      useClass: Repository<PaymentEntity>
    },
  ]
})

export class OrderModule {}