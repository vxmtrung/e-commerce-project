import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProductImgEntity } from '../domains/entities/product-img.entity';
import { CreateProductImgDto } from '../domains/dtos/requests/create-product-img.dto';
import { UpdateProductImgDto } from '../domains/dtos/requests/update-product-img.dto';

export interface IProductImgRepository {
  findProductImgsByProductInstanceId(productInstanceId: string): Promise<ProductImgEntity[]>;
  createProductImg(createProductImgDto: CreateProductImgDto): Promise<ProductImgEntity>;
  updateProductImg(id: string, updateProductImgDto: UpdateProductImgDto): Promise<UpdateResult>;
  deleteProductImgById(id: string): Promise<DeleteResult>;
}

@Injectable()
export class ProductImgRepository implements IProductImgRepository {
  constructor(
    @InjectRepository(ProductImgEntity)
    private productImgRepository: Repository<ProductImgEntity>
  ) {}

  async findProductImgsByProductInstanceId(productInstanceId: string): Promise<ProductImgEntity[]> {
    const productImgs = this.productImgRepository.find({
      where: {
        productInstanceId: productInstanceId
      }
    });

    return productImgs;
  }

  async createProductImg(createProductImgDto: CreateProductImgDto): Promise<ProductImgEntity> {
    const productImg = this.productImgRepository.save({
      ...createProductImgDto
    });

    return productImg;
  }

  async updateProductImg(id: string, updateProductImgDto: UpdateProductImgDto): Promise<UpdateResult> {
    const res = this.productImgRepository.update(id, {
      ...updateProductImgDto
    });

    return res;
  }

  async deleteProductImgById(id: string): Promise<DeleteResult> {
    const res = this.productImgRepository.delete(id);

    return res;
  }
}
