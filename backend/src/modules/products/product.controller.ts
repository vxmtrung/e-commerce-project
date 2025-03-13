import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { PublicRoute } from 'src/decorators/public-route.decorator';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @PublicRoute()
  getAllProducts() {
    return this.productService.findAll();
  }
}
