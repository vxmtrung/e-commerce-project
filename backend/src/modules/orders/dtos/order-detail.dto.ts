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
}
