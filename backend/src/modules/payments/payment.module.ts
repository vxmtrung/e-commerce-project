import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentEntity } from "./domains/entities/payment.entity";
import { PaymentService } from "./services/payment.service";
import { PaymentController } from "./controllers/payment.controller";
import { Repository } from "typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity])
  ],
  controllers: [PaymentController],
  exports: ['IPaymentService', 'IPaymentRepository'],
  providers: [
    {
      provide: 'IPaymentService',
      useClass: PaymentService
    },
    {
      provide: 'IPaymentRepository',
      useClass: Repository<PaymentEntity>
    }
  ]
})

export class PaymentModule {}