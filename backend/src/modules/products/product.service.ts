import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './domains/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>) {}

  findAll() {
    return this.productRepo.find();
  }
}
