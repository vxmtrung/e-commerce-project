import { Body, Controller, Get, Inject, Post, Put } from '@nestjs/common';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { IVoucherService } from '../services/voucher.service';
import { CreateVoucherDto } from '../domains/dtos/create-voucher.dto';
import { UpdateVoucherDto } from '../domains/dtos/update-voucher.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { VoucherEntity } from '../domains/entities/voucher.entity';
import { UpdateResult } from 'typeorm';

@Controller('vouchers')
@PublicRoute()
export class VoucherController {
  constructor(
    @Inject('IVoucherService')
    private readonly voucherService: IVoucherService
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: VoucherEntity,
    isArray: true
  })
  getVouchers() {
    return this.voucherService.getVouchers();
  }

  @Post()
  @ApiBody({
    type: CreateVoucherDto
  })
  @ApiResponse({
    status: 201,
    type: VoucherEntity
  })
  createVoucher(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @Put()
  @ApiBody({
    type: UpdateVoucherDto
  })
  @ApiResponse({
    status: 200,
    description: 'Update Brand Success',
    type: UpdateResult,
    example: `{
                "generatedMaps": [],
                "raw": [],
                "affected": 1
              }`
  })
  updateVoucher(@Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.updateVoucher(updateVoucherDto);
  }
}
