import { PaymentMethod } from "src/constants/payment-method.constant";
import { PaymentStatus } from "src/constants/payment-status.constant";
import { BuyerInfoDto } from "./buyer-info.dto";

export class OrderItemDetailDto {
  productId: string;
  instanceId: string;
  productName: string;
  instanceName: string;
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
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  buyer: BuyerInfoDto;
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
