import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../domains/entities/brand.entity';
import { CreateBrandDto } from '../domains/dtos/requests/create-brand.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateBrandDto } from '../domains/dtos/requests/update-brand.dto';
import { Filtering } from '../../../decorators/filtering-params.decorator';
import { Pagination } from '../../../decorators/pagination-params.decorator';
import { Sorting } from '../../../decorators/sorting-params.decorator';
import { PaginatedResource } from '../../../helpers/types/paginated-resource.type';
import { getOrder, getWhere } from '../../../helpers/filters.helper';

export interface IBrandRepository {
  findAllBrands(): Promise<BrandEntity[]>;
  findBrands(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<BrandEntity>>;
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

  async findBrands(
    paginationParams: Pagination,
    sort?: Sorting,
    filter?: Filtering[]
  ): Promise<PaginatedResource<BrandEntity>> {
    const { page, limit, size, offset } = paginationParams;
    const where = getWhere(filter);
    const order = getOrder(sort);

    const [brands, total] = await this.brandRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset
    });

    return {
      totalItems: total,
      items: brands,
      page,
      size
    };
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

  async findAllBrands(): Promise<BrandEntity[]> {
    return this.brandRepository.find();
  }
}
