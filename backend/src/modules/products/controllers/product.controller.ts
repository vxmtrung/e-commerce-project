import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
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
import { UUIDParam } from '../../../decorators/uuid-param.decorator';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchProductDto } from '../domains/dtos/response/search-product.dto';

@Controller('products')
@PublicRoute()
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService
  ) {}

  @Get()
  @ApiQuery({
    name: 'page',
    type: 'string'
  })
  @ApiQuery({
    name: 'size',
    type: 'number'
  })
  @ApiQuery({
    name: 'sort',
    type: 'string',
    description: `{sort field}:{sort direction}. For example: name:asc`,
    required: false
  })
  @ApiQuery({
    name: 'filter',
    type: 'string',
    description: `{filter field}:{filter operator}:{value}. For example: name:eq:admin`,
    default: null,
    required: false
  })
  @ApiResponse({
    status: 200,
    example: `
      {
        "totalItems": 20,
        "items": [
          {
            "id": "2ae6ce83-6986-46f2-a837-058222c6df43",
            "name": "Serum Vitamin C",
            "description": "Serum Vitamin C",
            "status": true,
            "categoryId": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
            "brandId": "53374039-66da-4747-a4ef-bc2093297dd1",
            "createdAt": "2025-03-11T16:47:59.038Z",
            "updatedAt": "2025-03-11T16:47:59.038Z",
            "deletedAt": null,
            "lowestPrice": 50000,
            "totalQuantity": 31
          }
        ],
        "page": 1,
        "size": 1
      }
    `,
    description: 'Get Products Success'
  })
  getProducts(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'status', 'categoryId', 'brandId', 'price']) sort?: Sorting,
    @FilteringParams(['name', 'status', 'categoryId', 'brandId']) filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>> {
    return this.productService.getProducts(paginationParams, sort, filter);
  }

  @Get('/search')
  @ApiQuery({
    name: 'page',
    type: 'string'
  })
  @ApiQuery({
    name: 'size',
    type: 'number'
  })
  @ApiQuery({
    name: 'sort',
    type: 'string',
    description: `{sort field}:{sort direction}. For example: name:asc`,
    required: false
  })
  @ApiQuery({
    name: 'filter',
    type: 'string',
    description: `{filter field}:{filter operator}:{value}. For example: name:eq:admin`,
    default: null,
    required: false
  })
  @ApiResponse({
    status: 200,
    example: `
      {
        "totalItems": 20,
        "items": [
          {
            "id": "566e4b29-43b9-42d5-863f-ca040f11a692",
            "name": "Kem dưỡng ẩm",
            "description": "Kem dưỡng ẩm chăm sóc da",
            "status": true,
            "lowestPrice": 49000,
            "highestPrice": 49000,
            "category": {
              "id": "b4557c01-9076-4686-8c6d-2692bd2ba0a4",
              "name": "Dưỡng da",
              "status": true
            },
            "brand": {
              "id": "5bb58152-26be-43ac-8fd5-48b44a77e444",
              "name": "AquaGlow",
              "status": true
            },
            "productInstances": [
              {
                "id": "261b4661-dbb1-4699-b42b-88fd131a25d2",
                "name": "Phiên bản 2025",
                "price": 49000,
                "quantity": 30,
                "productImgs": [
                  {
                    "id": "faa606b2-35d8-4b13-8f1d-1cb7fa87aff7",
                    "productInstanceId": "261b4661-dbb1-4699-b42b-88fd131a25d2",
                    "link": "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/09/hinh-anh-co-don.jpg",
                    "status": true
                  }
                ]
              }
            ]
          }
        ],
        "page": 0,
        "size": 1
      }
    `,
    description: 'Get Products Success'
  })
  searchProducts(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'status', 'categoryId', 'brandId', 'price']) sort?: Sorting,
    @FilteringParams(['name', 'status', 'categoryId', 'brandId']) filter?: Filtering[]
  ): Promise<PaginatedResource<SearchProductDto>> {
    return this.productService.SearchProducts(paginationParams, sort, filter);
  }

  @Get(':id/detail')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiResponse({
    type: ProductEntity,
    status: 200
  })
  getProductById(@UUIDParam('id') id: string): Promise<ProductEntity> {
    return this.productService.getProductById(id);
  }

  @Post()
  @ApiBody({
    type: CreateProductDto
  })
  @ApiResponse({
    status: 201,
    type: ProductEntity
  })
  createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiBody({
    type: UpdateProductDto
  })
  @ApiResponse({
    status: 200,
    description: 'Update Product Success',
    type: UpdateResult,
    example: `{
                "generatedMaps": [],
                "raw": [],
                "affected": 1
              }`
  })
  updateProduct(@UUIDParam('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  @ApiResponse({
    status: 200,
    description: 'Delete Product Success',
    example: `{
                "raw": [],
                "affected": 1
              }`
  })
  deleteProduct(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.productService.deleteProductById(id);
  }
}
