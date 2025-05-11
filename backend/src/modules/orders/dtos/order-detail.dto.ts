export class OrderItemDetailDto {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subTotal: number;
}

export class OrderDetailDto {
  orderId: string;
  status: string;
  shippingAddress: string;
  createdAt: Date;
  totalPrice: number;
  items: OrderItemDetailDto[];
}
