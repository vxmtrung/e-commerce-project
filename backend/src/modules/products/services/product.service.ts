import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { IProductRepository } from '../repositories/product.repository';
import { ProductEntity } from '../domains/entities/product.entity';
import { CreateProductDto } from '../domains/dtos/requests/create-product.dto';
import { IBrandService } from '../../brands/services/brand.service';
import { ICategoryService } from '../../categories/services/category.service';
import { Filtering } from '../../../decorators/filtering-params.decorator';
import { Pagination } from '../../../decorators/pagination-params.decorator';
import { Sorting } from '../../../decorators/sorting-params.decorator';
import { PaginatedResource } from '../../../helpers/types/paginated-resource.type';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateProductDto } from '../domains/dtos/requests/update-product.dto';
import { IProductInstanceService } from './product-instance.service';
import { IProductInstanceRepository } from '../repositories/product-instance.repository';
import { SearchProductDto } from '../domains/dtos/response/search-product.dto';

export interface IProductService {
  getProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>>;
  getProductById(id: string): Promise<ProductEntity>;
  getProductsByIds(ids: string[]): Promise<ProductEntity[]>;
  SearchProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<SearchProductDto>>;
  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;
  updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<UpdateResult>;
  deleteProductById(id: string): Promise<DeleteResult>;
}

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('IBrandService')
    private readonly brandService: IBrandService,
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
    @Inject(forwardRef(() => 'IProductInstanceService'))
    private readonly productInstanceService: IProductInstanceService,
    @Inject('IProductInstanceRepository')
    private readonly productInstanceRepository: IProductInstanceRepository
  ) {}

  async getProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>> {
    try {
      // If sorting by price, we need to handle it differently
      if (sort?.property === 'price') {
        // First get all products with their aggregated data
        const products = await this.productRepository.findProducts(paginationParams, undefined, filter);

        // Get product IDs from the current page
        const productIds = products.items.map((product) => product.id);

        // Get aggregated data for these products
        const aggregatedData = await this.productInstanceRepository.getProductInstancesAggregatedData(productIds);

        // Create a map for quick lookup
        const aggregatedDataMap = new Map(aggregatedData.map((data) => [data.productId, data]));

        // Combine the data and sort by price
        const productsWithDetails = {
          ...products,
          items: products.items
            .map((product) => ({
              ...product,
              lowestPrice: aggregatedDataMap.get(product.id)?.lowestPrice || 0,
              totalQuantity: aggregatedDataMap.get(product.id)?.totalQuantity || 0
            }))
            .sort((a, b) => {
              if (sort.direction === 'asc') {
                return (a.lowestPrice || 0) - (b.lowestPrice || 0);
              } else {
                return (b.lowestPrice || 0) - (a.lowestPrice || 0);
              }
            })
        };

        return productsWithDetails;
      }

      // Existing code for non-price sorting
      const products = await this.productRepository.findProducts(paginationParams, sort, filter);

      // Get product IDs from the current page
      const productIds = products.items.map((product) => product.id);

      // Get aggregated data for these products
      const aggregatedData = await this.productInstanceRepository.getProductInstancesAggregatedData(productIds);

      // Create a map for quick lookup
      const aggregatedDataMap = new Map(aggregatedData.map((data) => [data.productId, data]));

      // Combine the data
      const productsWithDetails = {
        ...products,
        items: products.items.map((product) => ({
          ...product,
          lowestPrice: aggregatedDataMap.get(product.id)?.lowestPrice || 0,
          totalQuantity: aggregatedDataMap.get(product.id)?.totalQuantity || 0
        }))
      };

      return productsWithDetails;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async SearchProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<SearchProductDto>> {
    const products = await this.productRepository.findProductsWithFilter(filter);

    const productDtoItems = await Promise.all(
      products.items.map(async (p) => {
        const [category, brand, productInstances] = await Promise.all([
          this.categoryService.getCategoryById(p.categoryId),
          this.brandService.getBrandById(p.brandId),
          this.productInstanceService.getProductInstancesDetailByProductId(p.id)
        ]);

        return new SearchProductDto(p, category, brand, productInstances);
      })
    );

    const start = paginationParams.page * paginationParams.size;
    const end = start + paginationParams.size;

    if (sort) {
      const sorted = productDtoItems.sort((a, b) =>
        sort.direction == 'asc' ? a.lowestPrice - b.lowestPrice : b.lowestPrice - a.lowestPrice
      );

      return {
        totalItems: products.totalItems,
        items: sorted.slice(start, end),
        page: paginationParams.page,
        size: paginationParams.size
      };
    }

    return {
      totalItems: products.totalItems,
      items: productDtoItems.slice(start, end),
      page: paginationParams.page,
      size: paginationParams.size
    };
  }

  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const product = await this.productRepository.findProductById(id);

      if (!product) {
        throw new NotFoundException(`Product with Id ${id} not found`);
      }

      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getProductsByIds(ids: string[]): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.findProductsByIds(ids);

      return products;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const [brand, category] = await Promise.all([
        this.brandService.getBrandById(createProductDto.brandId),
        this.categoryService.getCategoryById(createProductDto.categoryId)
      ]);

      if (!brand) {
        throw new NotFoundException(`Brand with id ${createProductDto.brandId} not found`);
      }

      if (!category) {
        throw new NotFoundException(`Category with id ${createProductDto.categoryId} not found`);
      }

      const product = await this.productRepository.createProduct(createProductDto);
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    try {
      const [brand, category, product] = await Promise.all([
        this.brandService.getBrandById(updateProductDto.brandId),
        this.categoryService.getCategoryById(updateProductDto.categoryId),
        this.productRepository.findProductById(id)
      ]);

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      if (!brand) {
        throw new NotFoundException(`Brand with id ${updateProductDto.brandId} not found`);
      }

      if (!category) {
        throw new NotFoundException(`Category with id ${updateProductDto.categoryId} not found`);
      }

      const res = await this.productRepository.updateProduct(id, updateProductDto);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteProductById(id: string): Promise<DeleteResult> {
    try {
      const [product, productInstances] = await Promise.all([
        this.productRepository.findProductById(id),
        this.productInstanceService.getProductInstancesByProductId(id)
      ]);

      if (!product) {
        throw new NotFoundException(`Product with Id ${id} not found`);
      }

      await Promise.all(
        productInstances.map((productInstance) =>
          this.productInstanceService.deleteProductInstanceById(productInstance.id)
        )
      );

      const res = await this.productRepository.deleteProductById(id);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
