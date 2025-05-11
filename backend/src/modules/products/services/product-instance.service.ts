import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { IProductInstanceRepository } from '../repositories/product-instance.repository';
import { ProductInstanceEntity } from '../domains/entities/product-instance.entity';
import { IProductService } from './product.service';
import { CreateProductInstanceDto } from '../domains/dtos/requests/create-product-instance.dto';
import { UpdateProductInstanceDto } from '../domains/dtos/requests/update-product-instance.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IProductImgService } from './product-img.service';
import { ProductInstanceDto } from '../domains/dtos/response/product-instance.dto';

export interface IProductInstanceService {
  getProductInstancesByProductId(productId: string): Promise<ProductInstanceEntity[]>;
  getProductInstanceById(id: string): Promise<ProductInstanceEntity>;
  createProductInstance(createProductInstanceDto: CreateProductInstanceDto): Promise<ProductInstanceEntity>;
  updateProductInstance(id: string, updateProductInstanceDto: UpdateProductInstanceDto): Promise<UpdateResult>;
  deleteProductInstanceById(id: string): Promise<DeleteResult>;
  getProductInstancesDetailByProductId(productId: string): Promise<ProductInstanceDto[]>;
}

@Injectable()
export class ProductInstanceService implements IProductInstanceService {
  constructor(
    @Inject('IProductInstanceRepository')
    private readonly productInstanceRepository: IProductInstanceRepository,
    @Inject(forwardRef(() => 'IProductService'))
    private readonly productService: IProductService,
    @Inject(forwardRef(() => 'IProductImgService'))
    private readonly productImgService: IProductImgService
  ) {}

  async getProductInstancesByProductId(productId: string): Promise<ProductInstanceEntity[]> {
    try {
      const product = await this.productService.getProductById(productId);

      if (!product) {
        throw new NotFoundException(`Not found product with id ${productId}`);
      }

      const productInstances = await this.productInstanceRepository.findProductInstancesByProductId(productId);

      return productInstances;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getProductInstancesDetailByProductId(productId: string): Promise<ProductInstanceDto[]> {
    try {
      const product = await this.productService.getProductById(productId);

      if (!product) {
        throw new NotFoundException(`Not found product with id ${productId}`);
      }

      const productInstances = await this.productInstanceRepository.findProductInstancesByProductId(productId);

      const res = await Promise.all(
        productInstances.map(async (pi) => {
          const imgs = await this.productImgService.getProductImgByProductInstanceId(pi.id);

          return new ProductInstanceDto(pi, imgs);
        })
      );
      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getProductInstanceById(id: string): Promise<ProductInstanceEntity> {
    try {
      const productInstance = await this.productInstanceRepository.findProductInstanceById(id);

      if (!productInstance) {
        throw new NotFoundException(`Not found Product Instance with id ${id}`);
      }

      return productInstance;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createProductInstance(createProductInstanceDto: CreateProductInstanceDto): Promise<ProductInstanceEntity> {
    try {
      const product = await this.productService.getProductById(createProductInstanceDto.productId);

      if (!product) {
        throw new NotFoundException(`Not found product with id ${createProductInstanceDto.productId}`);
      }

      const productInstance = await this.productInstanceRepository.createProductInstance(createProductInstanceDto);

      return productInstance;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateProductInstance(id: string, updateProductInstanceDto: UpdateProductInstanceDto): Promise<UpdateResult> {
    try {
      const [product, productInstance] = await Promise.all([
        this.productService.getProductById(updateProductInstanceDto.productId),
        this.productInstanceRepository.findProductInstanceById(id)
      ]);

      if (!productInstance) {
        throw new NotFoundException(`Not found product instance with id ${id}`);
      }

      if (!product) {
        throw new NotFoundException(`Not found product with id ${updateProductInstanceDto.productId}`);
      }

      const res = await this.productInstanceRepository.updateProductInstance(id, updateProductInstanceDto);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteProductInstanceById(id: string): Promise<DeleteResult> {
    try {
      const [productInstance, productImgs] = await Promise.all([
        this.productInstanceRepository.findProductInstanceById(id),
        this.productImgService.getProductImgByProductInstanceId(id)
      ]);

      if (!productInstance) {
        throw new NotFoundException(`Product Instance with id ${id} not found`);
      }

      await Promise.all(productImgs.map((img) => this.productImgService.deleteProductImgById(img.id)));

      const res = await this.productInstanceRepository.deleteProductInstanceById(id);

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
