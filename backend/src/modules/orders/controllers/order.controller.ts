import { Controller, Get, Post, Put, Delete, Param, Body, Inject, Query } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { UpdateShippingAddressDto } from '../dtos/update-shipping-address.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { UpdateOrderItemQuantityDto } from '../dtos/update-order-item-quantity';
import { IOrderService } from '../services/order.service';
import { OrderStatsFilterDto } from '../dtos/order-stats-filter.dto';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject('IOrderService')
    private readonly orderService: IOrderService
  ) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, updateStatusDto.status);
  }

  @Put(':id/shipping-address')
  updateShippingAddress(@Param('id') id: string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.orderService.updateShippingAddress(id, updateShippingAddressDto.shipping_address);
  }

  @Post(':orderId/order-item')
  addOrderItem(@Param('orderId') orderId: string, @Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderService.addOrderItem(orderId, createOrderItemDto);
  }

  @Delete('order-item/:id')
  deleteOrderItem(@Param('id') id: string) {
    return this.orderService.deleteOrderItem(id);
  }

  @Put('order-item/:id/quantity')
  updateOrderItemQuantity(@Param('id') id: string, @Body() updateOrderItemQuantityDto: UpdateOrderItemQuantityDto) {
    return this.orderService.updateOrderItemQuantity(id, updateOrderItemQuantityDto.quantity);
  }

  @Get('user/:userId')
  getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @Get(':id')
  getOrderDetail(@Param('id') orderId: string) {
    return this.orderService.getOrderDetail(orderId);
  }

  @Get('stats')
  getOrderStats(@Query() filterDto: OrderStatsFilterDto) {
    return this.orderService.getOrderStats(filterDto);
  }
}
