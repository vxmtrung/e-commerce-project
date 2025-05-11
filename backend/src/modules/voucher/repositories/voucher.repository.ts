import { Injectable } from '@nestjs/common';
import { CreateVoucherDto } from '../domains/dtos/create-voucher.dto';
import { VoucherEntity } from '../domains/entities/voucher.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateVoucherDto } from '../domains/dtos/update-voucher.dto';

export interface IVoucherRepository {
  findVoucherById(id: string): Promise<VoucherEntity | null>;
  findVoucherByCode(code: string): Promise<VoucherEntity | null>;
  findVouchers(): Promise<VoucherEntity[]>;
  createVoucher(createVoucherDto: CreateVoucherDto): Promise<VoucherEntity>;
  updateVoucher(updateVoucherDto: UpdateVoucherDto): Promise<VoucherEntity>;
}

@Injectable()
export class VoucherRepository implements IVoucherRepository {
  constructor(
    @InjectRepository(VoucherEntity)
    private voucherRepository: Repository<VoucherEntity>
  ) {}

  async findVouchers(): Promise<VoucherEntity[]> {
    const vouchers = await this.voucherRepository.find();

    return vouchers;
  }

  async findVoucherById(id: string): Promise<VoucherEntity | null> {
    const voucher = await this.voucherRepository.findOne({
      where: {
        id: id
      }
    });

    return voucher;
  }

  async findVoucherByCode(code: string): Promise<VoucherEntity | null> {
    const voucher = await this.voucherRepository.findOne({
      where: {
        code: code
      }
    });

    return voucher;
  }

  async createVoucher(createVoucherDto: CreateVoucherDto): Promise<VoucherEntity> {
    const voucher = await this.voucherRepository.save({ ...createVoucherDto });

    return voucher;
  }

  async updateVoucher(updateVoucherDto: UpdateVoucherDto): Promise<VoucherEntity> {
    const res = await this.voucherRepository.save({ ...updateVoucherDto });

    return res;
  }
}
