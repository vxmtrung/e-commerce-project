import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductInstanceEntity } from '../domains/entities/product-instance.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductInstanceDto } from '../domains/dtos/requests/create-product-instance.dto';
import { UpdateProductInstanceDto } from '../domains/dtos/requests/update-product-instance.dto';

export interface IProductInstanceRepository {
  findProductInstancesByProductId(productId: string): Promise<ProductInstanceEntity[]>;
  findProductInstanceById(id: string): Promise<ProductInstanceEntity | null>;
  createProductInstance(createProductInstanceDto: CreateProductInstanceDto): Promise<ProductInstanceEntity>;
  updateProductInstance(id: string, updateProductInstanceDto: UpdateProductInstanceDto): Promise<UpdateResult>;
  deleteProductInstanceById(id: string): Promise<DeleteResult>;
  getProductInstancesAggregatedData(productIds: string[]): Promise<{ productId: string; lowestPrice: number; totalQuantity: number }[]>;
}

@Injectable()
export class ProductInstanceRepository implements IProductInstanceRepository {
  constructor(
    @InjectRepository(ProductInstanceEntity)
    private productInstanceRepository: Repository<ProductInstanceEntity>
  ) {}

  async getProductInstancesAggregatedData(productIds: string[]): Promise<{ productId: string; lowestPrice: number; totalQuantity: number }[]> {
    const result = await this.productInstanceRepository
      .createQueryBuilder('pi')
      .select('pi.productId', 'productId')
      .addSelect('MIN(pi.price)', 'lowestPrice')
      .addSelect('SUM(pi.quantity)', 'totalQuantity')
      .where('pi.productId IN (:...productIds)', { productIds })
      .groupBy('pi.productId')
      .getRawMany();

    return result.map(item => ({
      productId: item.productId,
      lowestPrice: parseFloat(item.lowestPrice),
      totalQuantity: parseInt(item.totalQuantity)
    }));
  }

  async findProductInstancesByProductId(productId: string): Promise<ProductInstanceEntity[]> {
    const productInstances = this.productInstanceRepository.find({
      where: {
        productId: productId
      }
    });

    return productInstances;
  }

  async findProductInstanceById(id: string): Promise<ProductInstanceEntity | null> {
    const productInstance = this.productInstanceRepository.findOne({
      where: {
        id
      }
    });

    return productInstance;
  }

  async createProductInstance(createProductInstanceDto: CreateProductInstanceDto): Promise<ProductInstanceEntity> {
    const productInstance = this.productInstanceRepository.save({
      ...createProductInstanceDto
    });

    return productInstance;
  }

  async updateProductInstance(id: string, updateProductInstanceDto: UpdateProductInstanceDto): Promise<UpdateResult> {
    const res = this.productInstanceRepository.update(id, { ...updateProductInstanceDto });

    return res;
  }

  async deleteProductInstanceById(id: string): Promise<DeleteResult> {
    const res = this.productInstanceRepository.delete(id);

    return res;
  }
}
