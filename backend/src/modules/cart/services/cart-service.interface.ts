import { CartItem } from '../domains/entities/cart.entity';
import { AddToCartDto } from '../domains/dtos/requests/cart-item.dto';

export interface ICartService {
  getCart(): Promise<CartItem[]>;
  addToCart(item: AddToCartDto): Promise<void>;
  removeFromCart(productId: string): Promise<void>;
  clearCart(): Promise<void>;
  updateQuantity(productId: string, quantity: number): Promise<void>;
}
