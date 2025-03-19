import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateBrandDto } from '../domains/dtos/requests/create-brand.dto';
import { UpdateBrandDto } from '../domains/dtos/requests/update-brand.dto';
import { BrandEntity } from '../domains/entities/brand.entity';
import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { IBrandRepository } from '../repositories/brand.repository';

export interface IBrandService {
  getBrands(): Promise<BrandEntity[]>;
  createBrand(createBrandDto: CreateBrandDto): Promise<BrandEntity>;
  getBrandById(id: string): Promise<BrandEntity>;
  getBrandByName(name: string): Promise<BrandEntity>;
  deleteBrandById(id: string): Promise<DeleteResult>;
  updateBrand(id: string, updateBrandDto: UpdateBrandDto): Promise<UpdateResult>;
}

@Injectable()
export class BrandService implements IBrandService {
  constructor(
    @Inject('IBrandRepository')
    private readonly brandRepository: IBrandRepository
  ) {}

  async getBrands(): Promise<BrandEntity[]> {
    try {
      const brands = await this.brandRepository.findBrands();

      return brands;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getBrandById(id: string): Promise<BrandEntity> {
    try {
      const brand = await this.brandRepository.findBrandById(id);

      if (!brand) {
        throw new NotFoundException(`Not found brand with id ${id}`);
      }

      return brand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    try {
      const brand = await this.brandRepository.findBrandByName(createBrandDto.name);

      if (brand) {
        throw new ConflictException(`Brand with name ${createBrandDto.name} existed`);
      }

      const nBrand = await this.brandRepository.createBrand(createBrandDto);

      return nBrand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getBrandByName(name: string): Promise<BrandEntity> {
    try {
      const brand = await this.brandRepository.findBrandByName(name);

      if (!brand) {
        throw new NotFoundException(`Not found brand with name ${name}`);
      }

      return brand;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    try {
      const brand = await this.brandRepository.findBrandById(id);

      if (!brand) {
        throw new NotFoundException(`Not found brand with id ${id}`);
      }

      const res = await this.brandRepository.updateBrand(id, updateBrandDto);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteBrandById(id: string): Promise<DeleteResult> {
    try {
      const brand = await this.brandRepository.findBrandById(id);

      if (!brand) {
        throw new NotFoundException(`Not found brand with id ${id}`);
      }

      const res = await this.brandRepository.deleteBrandById(id);

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
