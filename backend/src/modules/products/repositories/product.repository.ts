import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../domains/entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from '../domains/dtos/requests/create-product.dto';
import { UpdateProductDto } from '../domains/dtos/requests/update-product.dto';
import { Filtering } from '../../../decorators/filtering-params.decorator';
import { Pagination } from '../../../decorators/pagination-params.decorator';
import { Sorting } from '../../../decorators/sorting-params.decorator';
import { PaginatedResource } from '../../../helpers/types/paginated-resource.type';
import { getWhere, getOrder } from '../../../helpers/filters.helper';

export interface IProductRepository {
  findProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>>;
  findProductById(id: string): Promise<ProductEntity | null>;
  createProduct(createProductDto: CreateProductDto): Promise<ProductEntity>;
  updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<UpdateResult>;
  deleteProductById(id: string): Promise<DeleteResult>;
}

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async findProducts(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<ProductEntity>> {
    const { page, limit, size, offset } = paginationParams;
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [products, total] = await this.productRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset
    });

    return {
      totalItems: total,
      items: products,
      page,
      size
    };
  }

  async findProductById(id: string): Promise<ProductEntity | null> {
    const product = this.productRepository.findOne({
      where: {
        id
      }
    });

    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepository.save({
      ...createProductDto
    });

    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    const res = this.productRepository.update(id, { ...updateProductDto });

    return res;
  }

  async deleteProductById(id: string): Promise<DeleteResult> {
    const res = this.productRepository.delete(id);

    return res;
  }
}
