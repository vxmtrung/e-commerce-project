import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { IProductImgService } from '../services/product-img.service';
import { ProductImgEntity } from '../domains/entities/product-img.entity';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { CreateProductImgDto } from '../domains/dtos/requests/create-product-img.dto';
import { UpdateProductImgDto } from '../domains/dtos/requests/update-product-img.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UUIDQuery } from '../../../decorators/uuid-query.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('product-imgs')
@PublicRoute()
export class ProductImgController {
  constructor(
    @Inject('IProductImgService')
    private readonly productImgService: IProductImgService
  ) {}

  @Get()
  @ApiQuery({
    name: 'product-instance-id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    type: ProductImgEntity,
    isArray: true
  })
  getProductImgByProductInstanceId(
    @UUIDQuery('product-instance-id') productInstanceId: string
  ): Promise<ProductImgEntity[]> {
    return this.productImgService.getProductImgByProductInstanceId(productInstanceId);
  }

  @Get(':id/detail')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    type: ProductImgEntity
  })
  getProductImgById(@UUIDParam('id') id: string): Promise<ProductImgEntity> {
    return this.productImgService.getProductImgById(id);
  }

  @Post()
  @ApiBody({
    type: CreateProductImgDto
  })
  @ApiResponse({
    status: 201,
    type: ProductImgEntity
  })
  createProductImg(@Body() createProductImgDto: CreateProductImgDto): Promise<ProductImgEntity> {
    return this.productImgService.createProductImg(createProductImgDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiBody({
    type: UpdateProductImgDto
  })
  @ApiResponse({
    status: 200,
    description: 'Update Product Img Success',
    type: UpdateResult,
    example: `{
                "generatedMaps": [],
                "raw": [],
                "affected": 1
              }`
  })
  updateProductImg(
    @UUIDParam('id') id: string,
    @Body() updateProductImgDto: UpdateProductImgDto
  ): Promise<UpdateResult> {
    return this.productImgService.updateProductImg(id, updateProductImgDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    description: 'Delete Product Img Success',
    example: `{
                "raw": [],
                "affected": 1
              }`
  })
  @Delete(':id')
  deleteProductImgById(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.productImgService.deleteProductImgById(id);
  }
}
