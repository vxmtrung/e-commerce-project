import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import { ICategoryRepository } from '../repositories/category.repository';
import { CategoryEntity } from '../domains/entities/category.entity';
import { CreateCategoryDto } from '../domains/dtos/requests/create-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateCategoryDto } from '../domains/dtos/requests/update-category.dto';

export interface ICategoryService {
  getCategories(): Promise<CategoryEntity[]>;
  createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity>;
  getCategoryById(id: string): Promise<CategoryEntity>;
  getCategoryByName(name: string): Promise<CategoryEntity>;
  deleteCategoryById(id: string): Promise<DeleteResult>;
  updateCategory(id: string, updateCategory: UpdateCategoryDto): Promise<UpdateResult>;
}

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async getCategories(): Promise<CategoryEntity[]> {
    try {
      const categories = await this.categoryRepository.findCategories();

      return categories;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    try {
      const categoryNameExist = await this.categoryRepository.findCategoryByName(createCategoryDto.name);

      if (categoryNameExist) {
        throw new ConflictException(`The category with name ${createCategoryDto.name} existed`);
      }

      const category = await this.categoryRepository.createCategory(createCategoryDto);

      return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getCategoryById(id: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.findCategoryById(id);

      if (!category) {
        throw new NotFoundException(`Not found category with Id ${id}`);
      }

      return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getCategoryByName(name: string): Promise<CategoryEntity> {
    try {
      const category = await this.categoryRepository.findCategoryByName(name);

      if (!category) {
        throw new NotFoundException(`Category with name ${name} not found`);
      }

      return category;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async updateCategory(id: string, updateCategory: UpdateCategoryDto): Promise<UpdateResult> {
    try {
      const category = await this.categoryRepository.findCategoryById(id);

      if (!category) {
        throw new NotFoundException(`Not found category with Id ${id}`);
      }

      const res = await this.categoryRepository.updateCategory(id, updateCategory);

      return res;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deleteCategoryById(id: string): Promise<DeleteResult> {
    try {
      const category = await this.categoryRepository.findCategoryById(id);

      if (!category) {
        throw new NotFoundException(`Not found category with Id ${id}`);
      }

      const res = await this.categoryRepository.deleteCategoryById(id);

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
