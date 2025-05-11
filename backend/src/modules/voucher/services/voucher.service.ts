import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IVoucherRepository } from '../repositories/voucher.repository';
import { VoucherEntity } from '../domains/entities/voucher.entity';
import { CreateVoucherDto } from '../domains/dtos/create-voucher.dto';
import { UpdateVoucherDto } from '../domains/dtos/update-voucher.dto';

export interface IVoucherService {
  getVoucherById(id: string): Promise<VoucherEntity>;
  getVoucherByCode(code: string): Promise<VoucherEntity>;
  getVouchers(): Promise<VoucherEntity[]>;
  createVoucher(createVoucherDto: CreateVoucherDto): Promise<VoucherEntity>;
  updateVoucher(updateVoucherDto: UpdateVoucherDto): Promise<VoucherEntity>;
}

@Injectable()
export class VoucherService implements IVoucherService {
  constructor(
    @Inject('IVoucherRepository')
    private readonly voucherRepository: IVoucherRepository
  ) {}

  async getVoucherById(id: string): Promise<VoucherEntity> {
    try {
      const voucher = await this.voucherRepository.findVoucherById(id);

      if (!voucher) {
        throw new NotFoundException(`Voucher with id ${id} not found`);
      }

      return voucher;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getVoucherByCode(code: string): Promise<VoucherEntity> {
    try {
      const voucher = await this.voucherRepository.findVoucherByCode(code);

      if (!voucher) {
        throw new NotFoundException(`Voucher with code ${code} not found`);
      }

      return voucher;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getVouchers(): Promise<VoucherEntity[]> {
    try {
      const vouchers = await this.voucherRepository.findVouchers();

      return vouchers;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createVoucher(createVoucherDto: CreateVoucherDto): Promise<VoucherEntity> {
    try {
      const voucher = await this.voucherRepository.createVoucher(createVoucherDto);

      return voucher;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateVoucher(createVoucherDto: CreateVoucherDto): Promise<VoucherEntity> {
    try {
      const voucher = await this.voucherRepository.updateVoucher(createVoucherDto);

      return voucher;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
