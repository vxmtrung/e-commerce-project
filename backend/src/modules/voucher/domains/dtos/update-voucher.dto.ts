import { PartialType } from '@nestjs/swagger';
import { VoucherEntity } from '../entities/voucher.entity';

export class UpdateVoucherDto extends PartialType(VoucherEntity) {}
