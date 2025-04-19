import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./domains/entities/order.entity";
import { OrderItemEntity } from "./domains/entities/order-item.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { IOrderItemRepository } from "./repositories/order-item.repository";
import { IOrderRepository } from "./repositories/order.repository";
import { Repository } from "typeorm";
import { ProductEntity } from "../products/domains/entities/product.entity";
import { ProductInstanceEntity } from "../products/domains/entities/product-instance.entity";
import { ProductInstanceRepository } from "../products/repositories/product-instance.repository";
import { ProductRepository } from "../products/repositories/product.repository";
import { ProductModule } from "../products/product.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    ProductModule
  ],
  controllers: [OrderController],
  exports: ['IOrderService', 'IOrderRepository', 'IOrderItemRepository'],
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
    // {
    //   provide: 'IProductRepository',
    //   useClass: ProductRepository
    // },
    // {
    //   provide: 'IProductInstanceRepository',
    //   useClass: ProductInstanceRepository
    // }
  ]
})

export class OrderModule {}