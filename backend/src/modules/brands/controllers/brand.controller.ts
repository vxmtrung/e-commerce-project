import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { IBrandService } from '../services/brand.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateBrandDto } from '../domains/dtos/requests/create-brand.dto';
import { UpdateBrandDto } from '../domains/dtos/requests/update-brand.dto';
import { BrandEntity } from '../domains/entities/brand.entity';
import { Pagination, PaginationParams } from '../../../decorators/pagination-params.decorator';
import { Sorting, SortingParams } from '../../../decorators/sorting-params.decorator';
import { Filtering, FilteringParams } from '../../../decorators/filtering-params.decorator';
import { PaginatedResource } from '../../../helpers/types/paginated-resource.type';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';

@Controller('brands')
@PublicRoute()
export class BrandController {
  constructor(
    @Inject('IBrandService')
    private readonly brandService: IBrandService
  ) {}

  @Get()
  getBrands(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @SortingParams(['name', 'status']) sort?: Sorting,
    @FilteringParams(['name', 'status']) filter?: Filtering[]
  ): Promise<BrandEntity[] | PaginatedResource<BrandEntity>> {
    if (!page || !size) {
      return this.brandService.getAllBrands();
    }
    const paginationParams: Pagination = {
      page: parseInt(page),
      size: parseInt(size),
      limit: parseInt(size),
      offset: (parseInt(page) - 1) * parseInt(size)
    };
    return this.brandService.getBrands(paginationParams, sort, filter);
  }

  @Get(':id')
  getBrandById(@UUIDParam('id') id: string): Promise<BrandEntity> {
    return this.brandService.getBrandById(id);
  }

  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    return this.brandService.createBrand(createBrandDto);
  }

  @Put(':id')
  updateBrand(@UUIDParam('id') id: string, @Body() updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    return this.brandService.updateBrand(id, updateBrandDto);
  }

  @Delete(':id')
  deleteBrand(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.brandService.deleteBrandById(id);
  }
}
