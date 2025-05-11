import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { IProductInstanceService } from '../services/product-instance.service';
import { ProductInstanceEntity } from '../domains/entities/product-instance.entity';
import { CreateProductInstanceDto } from '../domains/dtos/requests/create-product-instance.dto';
import { UpdateProductInstanceDto } from '../domains/dtos/requests/update-product-instance.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UUIDQuery } from '../../../decorators/uuid-query.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('product-instances')
@PublicRoute()
export class ProductInstanceController {
  constructor(
    @Inject('IProductInstanceService')
    private readonly productInstanceService: IProductInstanceService
  ) {}

  @Get()
  @ApiQuery({
    name: 'product-id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    type: ProductInstanceEntity,
    isArray: true
  })
  getProductInstancesByProductId(@UUIDQuery('product-id') productId: string): Promise<ProductInstanceEntity[]> {
    return this.productInstanceService.getProductInstancesByProductId(productId);
  }

  @Get(':id/detail')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    type: ProductInstanceEntity
  })
  getProductInstanceById(@UUIDParam('id') id: string): Promise<ProductInstanceEntity> {
    return this.productInstanceService.getProductInstanceById(id);
  }

  @Post()
  @ApiBody({
    type: CreateProductInstanceDto
  })
  @ApiResponse({
    status: 201,
    type: ProductInstanceEntity
  })
  createProductInstance(@Body() createProductInstanceDto: CreateProductInstanceDto): Promise<ProductInstanceEntity> {
    return this.productInstanceService.createProductInstance(createProductInstanceDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiBody({
    type: UpdateProductInstanceDto
  })
  @ApiResponse({
    status: 200,
    description: 'Update Product Instance Success',
    type: UpdateResult,
    example: `{
                "generatedMaps": [],
                "raw": [],
                "affected": 1
              }`
  })
  updateProductInstance(
    @UUIDParam('id') id: string,
    @Body() updateProductInstanceDto: UpdateProductInstanceDto
  ): Promise<UpdateResult> {
    return this.productInstanceService.updateProductInstance(id, updateProductInstanceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    description: 'Delete Product Instance Success',
    example: `{
                "raw": [],
                "affected": 1
              }`
  })
  deleteProductInstanceById(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.productInstanceService.deleteProductInstanceById(id);
  }
}
