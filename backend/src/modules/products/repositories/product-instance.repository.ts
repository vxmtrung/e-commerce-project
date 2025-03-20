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
}

@Injectable()
export class ProductInstanceRepository implements IProductInstanceRepository {
  constructor(
    @InjectRepository(ProductInstanceEntity)
    private productInstanceRepository: Repository<ProductInstanceEntity>
  ) {}

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
