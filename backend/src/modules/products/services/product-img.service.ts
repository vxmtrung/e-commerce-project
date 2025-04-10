import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { IProductImgRepository } from '../repositories/product-img.repository';
import { IProductInstanceService } from './product-instance.service';
import { ProductImgEntity } from '../domains/entities/product-img.entity';
import { CreateProductImgDto } from '../domains/dtos/requests/create-product-img.dto';
import { UpdateProductImgDto } from '../domains/dtos/requests/update-product-img.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

export interface IProductImgService {
  getProductImgByProductInstanceId(productInstanceId: string): Promise<ProductImgEntity[]>;
  getProductImgById(id: string): Promise<ProductImgEntity>;
  createProductImg(createProductImgDto: CreateProductImgDto): Promise<ProductImgEntity>;
  updateProductImg(id: string, updateProductImgDto: UpdateProductImgDto): Promise<UpdateResult>;
  deleteProductImgById(id: string): Promise<DeleteResult>;
}

@Injectable()
export class ProductImgService implements IProductImgService {
  constructor(
    @Inject('IProductImgRepository')
    private readonly productImgRepository: IProductImgRepository,
    @Inject(forwardRef(() => 'IProductInstanceService'))
    private readonly productInstanceService: IProductInstanceService
  ) {}

  async getProductImgByProductInstanceId(productInstanceId: string): Promise<ProductImgEntity[]> {
    try {
      const productInstance = await this.productInstanceService.getProductInstanceById(productInstanceId);

      if (!productInstance) {
        throw new NotFoundException(`Product Instance with id ${productInstanceId} not found`);
      }

      const productInstanceImgs = await this.productImgRepository.findProductImgsByProductInstanceId(productInstanceId);

      return productInstanceImgs;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getProductImgById(id: string): Promise<ProductImgEntity> {
    try {
      const productImg = await this.productImgRepository.findProductImgById(id);

      if (!productImg) {
        throw new NotFoundException(`Not found Product Img with id ${id}`);
      }

      return productImg;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createProductImg(createProductImgDto: CreateProductImgDto): Promise<ProductImgEntity> {
    try {
      const productInstance = await this.productInstanceService.getProductInstanceById(
        createProductImgDto.productInstanceId
      );

      if (!productInstance) {
        throw new NotFoundException(`Product Instance with id ${createProductImgDto.productInstanceId} not found`);
      }

      const productImg = await this.productImgRepository.createProductImg(createProductImgDto);

      return productImg;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateProductImg(id: string, updateProductImgDto: UpdateProductImgDto): Promise<UpdateResult> {
    try {
      const [productInstance, productImg] = await Promise.all([
        this.productInstanceService.getProductInstanceById(updateProductImgDto.productInstanceId),
        this.productImgRepository.findProductImgById(id)
      ]);

      if (!productInstance) {
        throw new NotFoundException(`Product Instance with id ${updateProductImgDto.productInstanceId} not found`);
      }

      if (!productImg) {
        throw new NotFoundException(`Product Instance Image with id ${id} not found`);
      }

      const res = await this.productImgRepository.updateProductImg(id, updateProductImgDto);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteProductImgById(id: string): Promise<DeleteResult> {
    try {
      const productImg = await this.productImgRepository.findProductImgById(id);

      if (!productImg) {
        throw new NotFoundException(`Product Instance Image with id ${id} not found`);
      }

      const res = await this.productImgRepository.deleteProductImgById(id);

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
