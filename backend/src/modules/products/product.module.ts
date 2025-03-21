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
import { ProductInstanceService } from './services/product-instance.service';
import { ProductImgService } from './services/product-img.service';
import { ProductInstanceController } from './controllers/product-instance.controller';
import { ProductImgController } from './controllers/product-img.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductInstanceEntity, ProductImgEntity]),
    BrandModule,
    CategoryModule
  ],
  controllers: [ProductController, ProductInstanceController, ProductImgController],
  exports: [
    'IProductService',
    'IProductRepository',
    'IProductInstanceService',
    'IProductInstanceRepository',
    'IProductImgService',
    'IProductImgRepository'
  ],
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
      provide: 'IProductInstanceService',
      useClass: ProductInstanceService
    },
    {
      provide: 'IProductInstanceRepository',
      useClass: ProductInstanceRepository
    },
    {
      provide: 'IProductImgService',
      useClass: ProductImgService
    },
    {
      provide: 'IProductImgRepository',
      useClass: ProductImgRepository
    }
  ]
})
export class ProductModule {}
