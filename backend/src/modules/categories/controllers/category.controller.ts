import { Body, Controller, Delete, Get, Inject, Post, Put } from '@nestjs/common';
import { ICategoryService } from '../services/category.service';
import { CategoryEntity } from '../domains/entities/category.entity';
import { CreateCategoryDto } from '../domains/dtos/requests/create-category.dto';
import { UpdateCategoryDto } from '../domains/dtos/requests/update-category.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PublicRoute } from '../../../decorators/public-route.decorator';
import { UUIDParam } from '../../../decorators/uuid-param.decorator';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
@PublicRoute()
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get All Categories',
    type: CategoryEntity,
    isArray: true
  })
  getCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.getCategories();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get category by id',
    type: CategoryEntity
  })
  @ApiParam({
    name: 'id',
    type: String
  })
  getCategoryById(@UUIDParam('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create Category',
    type: CategoryEntity
  })
  @ApiBody({
    type: CreateCategoryDto
  })
  createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Category Success',
    type: UpdateResult,
    example: `{
                "generatedMaps": [],
                "raw": [],
                "affected": 1
              }`
  })
  @ApiBody({
    type: UpdateCategoryDto
  })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  updateCategory(@UUIDParam('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<UpdateResult> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete Category Success',
    type: DeleteResult,
    example: `
    {
      "raw": [],
      "affected": 1
    }
    `
  })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  deleteCategory(@UUIDParam('id') id: string): Promise<DeleteResult> {
    return this.categoryService.deleteCategoryById(id);
  }
}
