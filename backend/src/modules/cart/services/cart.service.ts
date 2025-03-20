import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CartItem } from '../domains/entities/cart.entity';
import { ICartService } from './cart-service.interface';
import { AddToCartDto } from '../domains/dtos/requests/cart-item.dto';

@Injectable()
export class CartService implements ICartService {
  private cart: CartItem[] = [];

  async getCart(): Promise<CartItem[]> {
    return this.cart;
  }

  async addToCart(item: AddToCartDto): Promise<void> {
    const existingItem = this.cart.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push({ productId: item.productId, productName: item.productName, price: item.price, quantity: item.quantity });
    }
  }

  async removeFromCart(productId: string): Promise<void> {
    const index = this.cart.findIndex(i => i.productId === productId);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${productId} not found in cart`);
    }
    this.cart.splice(index, 1);
  }

  async clearCart(): Promise<void> {
    this.cart = [];
  }

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    const index = this.cart.findIndex(i => i.productId === productId);
    if (index === -1) {
      throw new NotFoundException(`Product ${productId} not found in cart`);
    }

    if (quantity <= 0) {
      // Nếu số lượng = 0 thì xoá luôn
      this.cart = this.cart.filter(i => i.productId !== productId);
    } else {
      this.cart[index].quantity = quantity;
    }
  }
}
