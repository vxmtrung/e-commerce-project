import { HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '../repositories/product.repository';
import { ProductEntity } from '../domains/entities/product.entity';
import { CreateProductDto } from '../domains/dtos/requests/create-product.dto';
import { IBrandService } from '../../brands/services/brand.service';
import { ICategoryService } from '../../categories/services/category.service';

export interface IProductService {
  getProducts(): Promise<ProductEntity[]>;
}

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
    @Inject('IBrandService')
    private readonly brandService: IBrandService,
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService
  ) {}

  async getProducts(): Promise<ProductEntity[]> {
    try {
      const products = await this.productRepository.findProducts();

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

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    try {
      const brand = await this.brandService.getBrandById(createProductDto.brandId);
      const category = await this.categoryService.getCategoryById(createProductDto.categoryId);

      if (brand && category) {
        const product = await this.productRepository.createProduct(createProductDto);
        return product;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
