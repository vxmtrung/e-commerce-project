import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { UpdateShippingAddressDto } from '../dtos/update-shipping-address.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { UpdateOrderItemQuantityDto } from '../dtos/update-order-item-quantity';
import { OrderEntity } from '../domains/entities/order.entity';
import { OrderItemEntity } from '../domains/entities/order-item.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order.repository';
import { IOrderItemRepository } from '../repositories/order-item.repository';

export interface IOrderService {
  findAll(): Promise<OrderEntity[]>;
  createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity>;
  deleteOrder(id: string): Promise<DeleteResult>;
  updateStatus(id: string, status: UpdateOrderStatusDto['status']): Promise<UpdateResult>;
  updateShippingAddress(
    id: string,
    shipping_address: UpdateShippingAddressDto['shipping_address']
  ): Promise<UpdateResult>;
  addOrderItem(orderId: string, createOrderItemDto: CreateOrderItemDto): Promise<OrderItemEntity>;
  deleteOrderItem(id: string): Promise<DeleteResult>;
  deleteOrderItemByOrder(orderId: string): Promise<DeleteResult>;
  updateOrderItemQuantity(id: string, quantity: UpdateOrderItemQuantityDto['quantity']): Promise<UpdateResult>;
}

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject('IOrderRepository')
    private orderRepository: IOrderRepository,
    @Inject('IOrderItemRepository')
    private orderItemsRepository: IOrderItemRepository
  ) {}

  async findAll() {
    return this.orderRepository.find();
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  async deleteOrder(id: string) {
    this.orderItemsRepository.delete({ orderId: id });
    return this.orderRepository.delete(id);
  }

  async updateStatus(id: string, status: UpdateOrderStatusDto['status']) {
    return this.orderRepository.update(id, { status });
  }

  async updateShippingAddress(id: string, shipping_address: UpdateShippingAddressDto['shipping_address']) {
    return this.orderRepository.update(id, { shippingAddress: shipping_address });
  }

  async addOrderItem(orderId: string, createOrderItemDto: CreateOrderItemDto) {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new Error('Order not found');
    }
    const orderItem = this.orderItemsRepository.create({ ...createOrderItemDto, orderId: order.id });
    return this.orderItemsRepository.save(orderItem);
  }

  async deleteOrderItem(id: string) {
    return this.orderItemsRepository.delete(id);
  }

  async deleteOrderItemByOrder(orderId: string) {
    return this.orderItemsRepository.delete({ orderId: orderId });
  }

  async updateOrderItemQuantity(id: string, quantity: UpdateOrderItemQuantityDto['quantity']) {
    return this.orderItemsRepository.update(id, { quantity });
  }
}
