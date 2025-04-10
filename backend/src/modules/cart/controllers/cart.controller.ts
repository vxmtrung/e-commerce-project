import { Controller, Get, Post, Body, Delete, Param, Inject, Patch, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ICartService } from '../services/cart-service.interface';
import { AddToCartDto } from '../domains/dtos/requests/cart-item.dto';
import { CartItemResponseDto } from '../domains/dtos/responses/cart-item.response';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('ICartService')
    private readonly cartService: ICartService
  ) {}

  @Get()
  async getCart(): Promise<CartItemResponseDto[]> {
    const cart = await this.cartService.getCart();
    return cart.map(item => ({
      productId: item.productId,
      productName: item.productName,
      price: item.price,
      quantity: item.quantity,
      total: item.price * item.quantity,
    }));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async addToCart(@Body() item: AddToCartDto): Promise<{ message: string }> {
    await this.cartService.addToCart(item);
    return { message: 'Product added to cart successfully' };
  }

  @Delete(':productId')
  @HttpCode(HttpStatus.OK)
  async removeFromCart(@Param('productId') productId: string): Promise<{ message: string }> {
    await this.cartService.removeFromCart(productId);
    return { message: 'Product removed from cart successfully' };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearCart(): Promise<{ message: string }> {
    await this.cartService.clearCart();
    return { message: 'Cart cleared successfully' };
  }

  @Patch(':productId')
  @HttpCode(HttpStatus.OK)
  async updateQuantity(
    @Param('productId') productId: string,
    @Body('quantity', ParseIntPipe) quantity: number
  ): Promise<{ message: string }> {
    await this.cartService.updateQuantity(productId, quantity);
    return { message: 'Cart item quantity updated successfully' };
  }
}
