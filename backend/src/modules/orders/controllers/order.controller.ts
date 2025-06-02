import { Controller, Get, Post, Put, Delete, Param, Body, Inject, Query } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { UpdateShippingAddressDto } from '../dtos/update-shipping-address.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { UpdateOrderItemQuantityDto } from '../dtos/update-order-item-quantity';
import { IOrderService } from '../services/order.service';
import { OrderStatsFilterDto } from '../dtos/order-stats-filter.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { OrderDetailDto } from '../dtos/order-detail.dto';
import { OrderStatus } from 'src/constants/order-status.constant';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject('IOrderService')
    private readonly orderService: IOrderService
  ) {}

  // @Get()
  // findAll() {
  //   return this.orderService.findAll();
  // }
  
  @Post()
  @ApiBody({
    type: CreateOrderDto
  })
  @ApiResponse({
    status: 201,
    description: 'Create Order Successfully',
    example: {
      "address": "abc",
      "userId": "7f44b733-b813-4ead-8228-00076b99ab82",
      "backupPhone": "012345678",
      "data": [
          {
              "brand": "BodySilk",
              "description": "Dưỡng Thể BodySilk",
              "image": "",
              "initialPrice": "69000",
              "key": "aed77133-73e0-4239-8932-4ba50247cc4e",
              "price": "69000",
              "productName": "Dưỡng Thể",
              "quantity": "46"
          },
          {
              "brand": "DarkMyst",
              "description": "Nước Hoa Nam DarkMyst",
              "image": "",
              "initialPrice": "65000",
              "key": "394f3d2b-2de4-4c99-90d4-2dcfdfde7e95",
              "price": "65000",
              "productName": "Nước Hoa Nam",
              "quantity": "44"
          }
      ],
      "discount": 0,
      "paymentMethod": "CREDIT_CARD",
      "receiverName": "abc",
      "receiverPhone": "012345678",
      "subTotal": 35000,
      "total": 35000
    }
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Put(':id/status')
  @ApiBody({
    type: UpdateOrderStatusDto
  })
  @ApiResponse({
    status: 201,
    description: 'Update Order Status Successfully',
    example: {
      status: OrderStatus.IN_PROGRESS
    }
  })
  updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, updateStatusDto.status);
  }

  @Put(':id/shipping-address')
  @ApiBody({
    type: UpdateShippingAddressDto
  })
  @ApiResponse({
    status: 201,
    description: 'Update Shipping Address Successfully',
    example: {
      shipping_address: "string"
    }
  })
  updateShippingAddress(@Param('id') id: string, @Body() updateShippingAddressDto: UpdateShippingAddressDto) {
    return this.orderService.updateShippingAddress(id, updateShippingAddressDto.shipping_address);
  }

  @Post(':orderId/order-item')
  @ApiBody({
    type: CreateOrderItemDto
  })
  @ApiResponse({
    status: 201,
    description: 'Add Order Item Successfully',
    example: {
      id: "string",
      productId: "string",
      orderId: "string",
      quantity: "number"
    }
  })
  addOrderItem(@Param('orderId') orderId: string, @Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderService.addOrderItem(orderId, createOrderItemDto);
  }

  @Delete('order-item/:id')
  deleteOrderItem(@Param('id') id: string) {
    return this.orderService.deleteOrderItem(id);
  }

  @Put('order-item/:id/quantity')
  @ApiBody({
    type: UpdateOrderItemQuantityDto
  })
  @ApiResponse({
    status: 201,
    description: 'Update Order Item Successfully',
    example: {
      quantity: 2
    }
  })
  updateOrderItemQuantity(@Param('id') id: string, @Body() updateOrderItemQuantityDto: UpdateOrderItemQuantityDto) {
    return this.orderService.updateOrderItemQuantity(id, updateOrderItemQuantityDto.quantity);
  }

  @Get('user/:userId')
  @ApiResponse({
    status: 201,
    description: 'Create Order Successfully',
    example: [{
      orderId: "string",
      status: "string",
      shippingAddress: "string",
      createdAt: "Date",
      totalPrice: "number",
      items: [{
        productId: "string",
        productName: "string",
        quantity: "number",
        price: "number",
        subTotal: "number",
      }]
    }]
  })
  getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Create Order Successfully',
    example: OrderDetailDto
  })
  getOrderDetail(@Param('id') orderId: string) {
    return this.orderService.getOrderDetail(orderId);
  }

  @Get('stats')
  @ApiBody({
    type: OrderStatsFilterDto
  })
  @ApiResponse({
    status: 201,
    description: 'Create Order Successfully',
    example: {
      totalOrders: "number",
      totalRevenue: "number",
      ordersByStatus: {
        "string": "number",
      },
      revenueByDay: [{
        date: "string",
        revenue: "number"
      }]
    }
  })
  getOrderStats(@Query() filterDto: OrderStatsFilterDto) {
    return this.orderService.getOrderStats(filterDto);
  }
}
