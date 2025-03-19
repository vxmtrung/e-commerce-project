import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../domains/entities/category.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCategoryDto } from '../domains/dtos/requests/create-category.dto';
import { UpdateCategoryDto } from '../domains/dtos/requests/update-category.dto';

export interface ICategoryRepository {
  findCategories(): Promise<CategoryEntity[]>;
  createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  findCategoryById(id: string): Promise<CategoryEntity | null>;
  findCategoryByName(name: string): Promise<CategoryEntity | null>;
  deleteCategoryById(id: string): Promise<DeleteResult>;
  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult>;
}

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async findCategories(): Promise<CategoryEntity[]> {
    const categories = this.categoryRepository.find();

    return categories;
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = this.categoryRepository.save({ ...createCategoryDto });

    return category;
  }

  async findCategoryById(id: string): Promise<CategoryEntity | null> {
    const category = this.categoryRepository.findOne({
      where: {
        id
      }
    });

    return category;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity | null> {
    const category = this.categoryRepository.findOne({
      where: {
        name: name
      }
    });

    return category;
  }

  async deleteCategoryById(id: string): Promise<DeleteResult> {
    const res = this.categoryRepository.delete(id);

    return res;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    const updateResult = this.categoryRepository.update(id, { ...updateCategoryDto });

    return updateResult;
  }
}
