import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { IProductInstanceService } from '../services/product-instance.service';
import { ProductInstanceEntity } from '../domains/entities/product-instance.entity';
import { CreateProductInstanceDto } from '../domains/dtos/requests/create-product-instance.dto';
import { UpdateProductInstanceDto } from '../domains/dtos/requests/update-product-instance.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UUIDQuery } from '../../../decorators/uuid-query.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';

@Controller('product-instances')
@PublicRoute()
export class ProductInstanceController {
  constructor(
    @Inject('IProductInstanceService')
    private readonly productInstanceService: IProductInstanceService
  ) {}

  @Get()
  getProductInstancesByProductId(@UUIDQuery('product-id') productId: string): Promise<ProductInstanceEntity[]> {
    return this.productInstanceService.getProductInstancesByProductId(productId);
  }

  @Get(':id')
  getProductInstanceById(@UUIDParam('id') id: string): Promise<ProductInstanceEntity> {
    return this.productInstanceService.getProductInstanceById(id);
  }

  @Post()
  createProductInstance(@Body() createProductInstanceDto: CreateProductInstanceDto): Promise<ProductInstanceEntity> {
    return this.productInstanceService.createProductInstance(createProductInstanceDto);
  }

  @Put(':id')
  updateProductInstance(
    @UUIDParam('id') id: string,
    @Body() updateProductInstanceDto: UpdateProductInstanceDto
  ): Promise<UpdateResult> {
    return this.productInstanceService.updateProductInstance(id, updateProductInstanceDto);
  }

  @Delete(':id')
  deleteProductInstanceById(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.productInstanceService.deleteProductInstanceById(id);
  }
}
