import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { IBrandService } from '../services/brand.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateBrandDto } from '../domains/dtos/requests/create-brand.dto';
import { UpdateBrandDto } from '../domains/dtos/requests/update-brand.dto';
import { BrandEntity } from '../domains/entities/brand.entity';
// import { Pagination } from '../../../decorators/pagination-params.decorator';
// import { Sorting, SortingParams } from '../../../decorators/sorting-params.decorator';
// import { Filtering, FilteringParams } from '../../../decorators/filtering-params.decorator';
// import { PaginatedResource } from '../../../helpers/types/paginated-resource.type';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('brands')
@PublicRoute()
export class BrandController {
  constructor(
    @Inject('IBrandService')
    private readonly brandService: IBrandService
  ) {}

  @Get()
  @ApiResponse({
    type: BrandEntity,
    isArray: true,
    status: 200
  })
  getBrands() // @Query('page') page?: string,
  // @Query('size') size?: string,
  // @SortingParams(['name', 'status']) sort?: Sorting,
  // @FilteringParams(['name', 'status']) filter?: Filtering[]
  : Promise<BrandEntity[]> {
    // if (!page || !size) {
    return this.brandService.getAllBrands();
    // }
    // const paginationParams: Pagination = {
    //   page: parseInt(page),
    //   size: parseInt(size),
    //   limit: parseInt(size),
    //   offset: (parseInt(page) - 1) * parseInt(size)
    // };
    // return this.brandService.getBrands(paginationParams, sort, filter);
  }

  // @Get(':id')
  // getBrandById(@UUIDParam('id') id: string): Promise<BrandEntity> {
  //   return this.brandService.getBrandById(id);
  // }

  @Post()
  @ApiBody({
    type: CreateBrandDto
  })
  @ApiResponse({
    status: 201,
    type: BrandEntity
  })
  createBrand(@Body() createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    return this.brandService.createBrand(createBrandDto);
  }

  @Put(':id')
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
  @ApiBody({
    type: UpdateBrandDto
  })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  updateBrand(@UUIDParam('id') id: string, @Body() updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    return this.brandService.updateBrand(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete Brand Success',
    type: DeleteResult,
    example: `
    {
      "raw": [],
      "affected": 1
    }
    `
  })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  deleteBrand(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.brandService.deleteBrandById(id);
  }
}
