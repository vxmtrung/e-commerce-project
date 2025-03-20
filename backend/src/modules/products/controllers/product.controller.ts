import { Controller, Get, Inject } from '@nestjs/common';
import { PublicRoute } from 'src/decorators/public-route.decorator';
import { IProductService } from '../services/product.service';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService
  ) {}

  @Get()
  @PublicRoute()
  getAllProducts() {
    return this.productService.getProducts();
  }
}
