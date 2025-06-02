export class OrderItemDetailDto {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subTotal: number;

  constructor(
    productId: string, productName: string, quantity: number,
    price: number, subTotal: number
  ) {
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.price = price;
    this.subTotal = subTotal;
  }
}

export class OrderDetailDto {
  orderId: string;
  status: string;
  shippingAddress: string;
  createdAt: Date;
  totalPrice: number;
  items: OrderItemDetailDto[];

  constructor(
    orderId: string, status: string, shippingAddress: string,
    createdAt: Date, totalPrice: number, items: OrderItemDetailDto[]
  ) {
    this.orderId = orderId;
    this.status = status;
    this.shippingAddress = shippingAddress;
    this.createdAt = createdAt;
    this.totalPrice = totalPrice;
    this.items = items;
  }
}
