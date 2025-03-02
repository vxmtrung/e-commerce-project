import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domains/entities/product.entity';
import { ProductInstanceEntity } from './domains/entities/product-instance.entity';
import { ProductImgEntity } from './domains/entities/product-img.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductInstanceEntity, ProductImgEntity])],
  controllers: [],
  exports: [],
  providers: []
})
export class ProductModule {}
