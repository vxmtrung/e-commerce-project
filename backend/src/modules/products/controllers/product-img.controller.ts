import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { IProductImgService } from '../services/product-img.service';
import { ProductImgEntity } from '../domains/entities/product-img.entity';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { CreateProductImgDto } from '../domains/dtos/requests/create-product-img.dto';
import { UpdateProductImgDto } from '../domains/dtos/requests/update-product-img.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UUIDQuery } from '../../../decorators/uuid-query.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';

@Controller('product-imgs')
@PublicRoute()
export class ProductImgController {
  constructor(
    @Inject('IProductImgService')
    private readonly productImgService: IProductImgService
  ) {}

  @Get()
  getProductImgByProductInstanceId(
    @UUIDQuery('product-instance-id') productInstanceId: string
  ): Promise<ProductImgEntity[]> {
    return this.productImgService.getProductImgByProductInstanceId(productInstanceId);
  }

  @Get(':id')
  getProductImgById(@UUIDParam('id') id: string): Promise<ProductImgEntity> {
    return this.productImgService.getProductImgById(id);
  }

  @Post()
  createProductImg(@Body() createProductImgDto: CreateProductImgDto): Promise<ProductImgEntity> {
    return this.productImgService.createProductImg(createProductImgDto);
  }

  @Put(':id')
  updateProductImg(
    @UUIDParam('id') id: string,
    @Body() updateProductImgDto: UpdateProductImgDto
  ): Promise<UpdateResult> {
    return this.productImgService.updateProductImg(id, updateProductImgDto);
  }

  @Delete(':id')
  deleteProductImgById(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.productImgService.deleteProductImgById(id);
  }
}
