import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./domains/entities/order.entity";
import { OrderItemEntity } from "./domains/entities/order-item.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { Repository } from "typeorm";
import { ProductModule } from "../products/product.module";
import { PaymentEntity } from "../payments/domains/entities/payment.entity";
import { UserEntity } from "../users/domains/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, PaymentEntity, UserEntity]),
    ProductModule
  ],
  controllers: [OrderController],
  exports: ['IOrderService', 'IOrderRepository', 'IOrderItemRepository', 'IPaymentRepository', 'IUserRepository'],
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
    {
      provide: 'IUserRepository',
      useClass: Repository<UserEntity>
    },
  ]
})

export class OrderModule {}