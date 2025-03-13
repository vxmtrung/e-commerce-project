import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domains/entities/product.entity';
import { ProductInstanceEntity } from './domains/entities/product-instance.entity';
import { ProductImgEntity } from './domains/entities/product-img.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductInstanceEntity, ProductImgEntity])],
  controllers: [ProductController],
  exports: [],
  providers: [ProductService]
})
export class ProductModule {}
