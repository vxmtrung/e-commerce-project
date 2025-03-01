import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentEntity } from "./domains/entities/payment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [],
  exports: [],
  providers: []
})

export class PaymentModule {}