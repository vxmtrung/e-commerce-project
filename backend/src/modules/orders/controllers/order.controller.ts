import { Controller, Get, Post, Put, Delete, Param, Body, Inject, Query } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { UpdateShippingAddressDto } from '../dtos/update-shipping-address.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { UpdateOrderItemQuantityDto } from '../dtos/update-order-item-quantity';
import { IOrderService } from '../services/order.service';
import { OrderStatsFilterDto } from '../dtos/order-stats-filter.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get all orders for a specific user' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user whose orders to retrieve',
    type: String
  })
  @ApiResponse({    status: 200,
    description: 'List of orders retrieved successfully',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              orderId: { type: 'string', example: 'a319ffd9-f2d8-4e8d-a6a1-2c909943299f' },
              status: { type: 'string', example: 'IN_PROGRESS' },
              shippingAddress: { type: 'string', example: 'abc' },
              createdAt: { type: 'string', example: '2025-06-01T12:03:58.297Z' },
              totalPrice: { type: 'number', example: 6034000 },
              paymentMethod: { type: 'string', example: 'CREDIT_CARD' },
              paymentStatus: { type: 'string', example: 'COMPLETED' },
              buyer: {
                type: 'object',
                properties: {
                  id: { type: 'string', example: '7f44b733-b813-4ead-8228-00076b99ab82' },
                  name: { type: 'string', example: 'Son test' },
                  email: { type: 'string', example: 'son@hcmut.edu.vn' },
                  phoneNumber: { type: 'string', example: '0578635487' },
                  username: { type: 'string', example: 'sontest' },
                  role: { type: 'string', example: 'USER' },
                  status: { type: 'boolean', example: false },
                  createdAt: { type: 'string', example: '2025-06-01T07:10:33.702Z' },
                  updatedAt: { type: 'string', example: '2025-06-01T07:10:33.702Z' },
                  deletedAt: { type: 'string', example: null }
                }
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    productId: { type: 'string', example: '642737f4-9991-403f-9ba3-237c5247dd8f' },
                    instanceId: { type: 'string', example: 'aed77133-73e0-4239-8932-4ba50247cc4e' },
                    productName: { type: 'string', example: 'Dưỡng Thể' },
                    instanceName: { type: 'string', example: 'Phiên bản 2023' },
                    quantity: { type: 'number', example: 46 },
                    price: { type: 'number', example: 69000 },
                    subTotal: { type: 'number', example: 3174000 },
                    imageUrl: { type: 'string', example: '/productImage.png' }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  getOrdersByUser(@Param('userId') userId: string) {
    return this.orderService.getOrdersByUser(userId);
  }  
  
  @Get('stats')
  @ApiOperation({ summary: 'Get order statistics with optional date filtering' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date for filtering orders (YYYY-MM-DD)',
    type: String
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date for filtering orders (YYYY-MM-DD)',
    type: String
  })
  @ApiResponse({
    status: 200,
    description: 'Order statistics retrieved successfully',
    schema: {
      example: {
        totalOrders: 150,
        totalRevenue: 15000.50,
        ordersByStatus: {
          "IN_PROGRESS": 45,
          "DELIVERED": 90,
          "CANCELLED": 15
        },
        revenueByDay: [{
          date: "2025-06-01",
          revenue: 5250.25
        }, {
          date: "2025-06-02",
          revenue: 9750.25
        }]
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid date format in filter parameters'
  })
  getOrderStats(@Query() filterDto: OrderStatsFilterDto) {
    return this.orderService.getOrderStats(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed information about a specific order' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the order to retrieve',
    type: String
  })
  @ApiResponse({    status: 200,
    description: 'Order details retrieved successfully',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            orderId: { type: 'string', example: '7cdd8a2a-601c-4613-9dee-0886c70cfb92' },
            status: { type: 'string', example: 'IN_PROGRESS' },
            shippingAddress: { type: 'string', example: 'Binh Duong' },
            createdAt: { type: 'string', example: '2025-06-03T10:51:49.161Z' },
            totalPrice: { type: 'number', example: 107000 },
            paymentMethod: { type: 'string', example: 'CASH_ON_DELIVERY' },
            paymentStatus: { type: 'string', example: 'PENDING' },
            buyer: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '591de79e-545c-4f51-bffd-20f0fae508d4' },
                name: { type: 'string', example: 'Nguyen' },
                email: { type: 'string', example: 'nguyen24072003@gmail.com' },
                phoneNumber: { type: 'string', example: '0979798554' },
                username: { type: 'string', example: 'nguyengl03' },
                role: { type: 'string', example: 'USER' },
                status: { type: 'boolean', example: false },
                createdAt: { type: 'string', example: '2025-06-03T04:56:48.628Z' },
                updatedAt: { type: 'string', example: '2025-06-03T04:56:48.628Z' },
                deletedAt: { type: 'string', example: null }
              }
            },            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {                  productId: { type: 'string', example: '566e4b29-43b9-42d5-863f-ca040f11a692' },
                  instanceId: { type: 'string', example: '261b4661-dbb1-4699-b42b-88fd131a25d2' },
                  productName: { type: 'string', example: 'Kem dưỡng ẩm' },
                  instanceName: { type: 'string', example: 'Phiên bản 2025' },
                  quantity: { type: 'number', example: 1 },
                  price: { type: 'number', example: 49000 },
                  discountPercent: { type: 'number', example: 10 },
                  subTotal: { type: 'number', example: 44100 },
                  imageUrl: { type: 'string', example: '/productImage.png' }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Order not found'
  })
  getOrderDetail(@Param('id') orderId: string) {
    return this.orderService.getOrderDetail(orderId);
  }
}
