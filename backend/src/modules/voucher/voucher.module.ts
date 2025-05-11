import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherEntity } from './domains/entities/voucher.entity';
import { VoucherController } from './controllers/voucher.controller';
import { VoucherService } from './services/voucher.service';
import { VoucherRepository } from './repositories/voucher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherEntity])],
  controllers: [VoucherController],
  exports: ['IVoucherService', 'IVoucherRepository'],
  providers: [
    {
      provide: 'IVoucherService',
      useClass: VoucherService
    },
    {
      provide: 'IVoucherRepository',
      useClass: VoucherRepository
    }
  ]
})
export class VoucherModule {}
