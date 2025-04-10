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

export interface IProductService {
  getProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>>;
  getProductById(id: string): Promise<ProductEntity>;
  getProductsByIds(ids: string[]): Promise<ProductEntity[]>;
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
    private readonly productInstanceService: IProductInstanceService
  ) {}

  async getProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>> {
    try {
      const products = await this.productRepository.findProducts(paginationParams, sort, filter);

      return products;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
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
