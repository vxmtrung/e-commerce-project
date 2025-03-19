import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './domains/entities/category.entity';
import { CategoryController } from './controllers/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  exports: ['ICategoryRepository', 'ICategoryService'],
  providers: [
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository
    },
    {
      provide: 'ICategoryService',
      useClass: CategoryService
    }
  ]
})
export class CategoryModule {}
