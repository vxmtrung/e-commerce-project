import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../domains/entities/brand.entity';
import { CreateBrandDto } from '../domains/dtos/requests/create-brand.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateBrandDto } from '../domains/dtos/requests/update-brand.dto';

export interface IBrandRepository {
  findBrands(): Promise<BrandEntity[]>;
  createBrand(createBrandDto: CreateBrandDto): Promise<BrandEntity>;
  findBrandById(id: string): Promise<BrandEntity | null>;
  findBrandByName(name: string): Promise<BrandEntity | null>;
  deleteBrandById(id: string): Promise<DeleteResult>;
  updateBrand(id: string, updateBrandDto: UpdateBrandDto): Promise<UpdateResult>;
}

@Injectable()
export class BrandRepository implements IBrandRepository {
  constructor(
    @InjectRepository(BrandEntity)
    private brandRepository: Repository<BrandEntity>
  ) {}

  async findBrands(): Promise<BrandEntity[]> {
    const brands = this.brandRepository.find();

    return brands;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<BrandEntity> {
    const brand = this.brandRepository.save({ ...createBrandDto });

    return brand;
  }

  async findBrandById(id: string): Promise<BrandEntity | null> {
    const brand = this.brandRepository.findOne({
      where: {
        id
      }
    });

    return brand;
  }

  async findBrandByName(name: string): Promise<BrandEntity | null> {
    const brand = this.brandRepository.findOne({
      where: {
        name: name
      }
    });

    return brand;
  }

  async deleteBrandById(id: string): Promise<DeleteResult> {
    const res = this.brandRepository.delete(id);

    return res;
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto): Promise<UpdateResult> {
    const res = this.brandRepository.update(id, { ...updateBrandDto });

    return res;
  }
}
