import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domains/entities/product.entity';
import { ProductInstanceEntity } from './domains/entities/product-instance.entity';
import { ProductImgEntity } from './domains/entities/product-img.entity';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { ProductInstanceRepository } from './repositories/product-instance.repository';
import { ProductImgRepository } from './repositories/product-img.repository';
import { BrandModule } from '../brands/brand.module';
import { CategoryModule } from '../categories/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductInstanceEntity, ProductImgEntity]),
    BrandModule,
    CategoryModule
  ],
  controllers: [ProductController],
  exports: ['IProductService', 'IProductRepository', 'IProductInstanceRepository', 'IProductImgRepository'],
  providers: [
    {
      provide: 'IProductService',
      useClass: ProductService
    },
    {
      provide: 'IProductRepository',
      useClass: ProductRepository
    },
    {
      provide: 'IProductInstanceRepository',
      useClass: ProductInstanceRepository
    },
    {
      provide: 'IProductImgRepository',
      useClass: ProductImgRepository
    }
  ]
})
export class ProductModule {}
