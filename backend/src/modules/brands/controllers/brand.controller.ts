import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { IBrandService } from '../services/brand.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateBrandDto } from '../domains/dtos/requests/create-brand.dto';
import { UpdateBrandDto } from '../domains/dtos/requests/update-brand.dto';
import { BrandEntity } from '../domains/entities/brand.entity';

@Controller('brands')
export class BrandController {
  constructor(
    @Inject('IBrandService')
    private readonly brandService: IBrandService
  ) {}

  @Get()
  getCategories(@Query('name') name: string): Promise<BrandEntity[] | BrandEntity> {
    return name ? this.brandService.getBrandByName(name) : this.brandService.getBrands();
  }

  @Get(':id')
  getBrandById(@Param('id') id: string): Promise<BrandEntity> {
    return this.brandService.getBrandById(id);
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    return this.brandService.createBrand(createBrandDto);
  }

  @Put(':id')
  updateBrand(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    return this.brandService.updateBrand(id, updateBrandDto);
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: string): Promise<DeleteResult> {
    return this.brandService.deleteBrandById(id);
  }
}
