import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { ICategoryService } from '../services/category.service';
import { CategoryEntity } from '../domains/entities/category.entity';
import { CreateCategoryDto } from '../domains/dtos/requests/create-category.dto';
import { UpdateCategoryDto } from '../domains/dtos/requests/update-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';

@Controller('categories')
@PublicRoute()
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService
  ) {}

  @Get()
  getCategories(@Query('name') name: string): Promise<CategoryEntity[] | CategoryEntity> {
    return name ? this.categoryService.getCategoryByName(name) : this.categoryService.getCategories();
  }

  @Get(':id')
  getCategoryById(@UUIDParam('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  updateCategory(@UUIDParam('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.categoryService.deleteCategoryById(id);
  }
}
