import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';

@Module({
  controllers: [CartController],
  providers: [
    {
      provide: 'ICartService',
      useClass: CartService
    }
  ],
  exports: ['ICartService']
})
export class CartModule {}
