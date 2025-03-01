import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./domains/entities/order.entity";
import { OrderItemEntity } from "./domains/entities/order-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
    controllers: [],
    exports: [],
    providers: []
})

export class OrderModule {}