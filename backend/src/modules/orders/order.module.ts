import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./domains/entities/order.entity";
import { OrderItemEntity } from "./domains/entities/order-item.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { IOrderService } from "./services/order.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
  ],
  controllers: [OrderController],
  exports: ['IOrderService'],
  providers: [{
    provide: 'IOrderService',
    useClass: OrderService
  }]
})

export class OrderModule {}