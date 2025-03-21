import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { IProductService } from '../services/product.service';
import { FilteringParams, Filtering } from '../../../decorators/filtering-params.decorator';
import { PaginationParams, Pagination } from '../../../decorators/pagination-params.decorator';
import { SortingParams, Sorting } from '../../../decorators/sorting-params.decorator';
import { PaginatedResource } from '../../../helpers/types/paginated-resource.type';
import { ProductEntity } from '../domains/entities/product.entity';
import { CreateProductDto } from '../domains/dtos/requests/create-product.dto';
import { UpdateProductDto } from '../domains/dtos/requests/update-product.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('products')
@PublicRoute()
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService
  ) {}

  @Get()
  getProducts(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'status', 'categoryId', 'brandId']) sort?: Sorting,
    @FilteringParams(['name', 'status', 'categoryId', 'brandId']) filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>> {
    console.log(filter);
    return this.productService.getProducts(paginationParams, sort, filter);
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.getProductById(id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.deleteProductById(id);
  }
}
