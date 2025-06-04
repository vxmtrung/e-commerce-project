import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { UpdateShippingAddressDto } from '../dtos/update-shipping-address.dto';
import { CreateOrderItemDto } from '../dtos/create-order-item.dto';
import { UpdateOrderItemQuantityDto } from '../dtos/update-order-item-quantity';
import { OrderEntity } from '../domains/entities/order.entity';
import { OrderItemEntity } from '../domains/entities/order-item.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatsDto } from '../dtos/order-stats.dto';
import { OrderStatsFilterDto } from '../dtos/order-stats-filter.dto';
import { OrderDetailDto } from '../dtos/order-detail.dto';
import { OrderStatus } from 'src/constants/order-status.constant';
import { IProductRepository } from 'src/modules/products/repositories/product.repository';
import { IProductInstanceRepository } from 'src/modules/products/repositories/product-instance.repository';
import { IProductImgService } from 'src/modules/products/services/product-img.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentEntity } from 'src/modules/payments/domains/entities/payment.entity';
import { PaymentStatus } from 'src/constants/payment-status.constant';
import { UserEntity } from 'src/modules/users/domains/entities/user.entity';

export interface IOrderService {
  findAll(): Promise<OrderDetailDto[]>;
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
  getOrdersByUser(userId: string): Promise<OrderDetailDto[]>;
  getOrderDetail(id: string): Promise<OrderDetailDto>;
  cancelOrder(id: string): Promise<UpdateResult>;
  getOrderStats(filterDto: OrderStatsFilterDto): Promise<OrderStatsDto>;
}

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemsRepository: Repository<OrderItemEntity>,
    @Inject('IProductRepository')
    private productRepository: IProductRepository,
    @Inject('IProductInstanceRepository')
    private productInstanceRepository: IProductInstanceRepository,
    @Inject('IProductImgService')
    private productImgService: IProductImgService,
    @InjectRepository(PaymentEntity)
    private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async findAll() : Promise<OrderDetailDto[]> {
    const orders = await this.orderRepository.find();

    const results: OrderDetailDto[] = [];

    for (const order of orders) {
      const orderItems = await this.orderItemsRepository.find({ where: { orderId: order.id } });
      const payments = await this.paymentRepository.find({ where: { orderId: order.id } });
      const user = await this.userRepository.findOneBy({ id: order.userId });

      const productInstances = [];
      const products = [];
      for (const item of orderItems) {
        const productInstance = await this.productInstanceRepository.findProductInstanceById(item?.productId);
        const product = await this.productRepository.findProductById(productInstance?.productId);

        productInstances.push(productInstance);
        products.push(product);
      }

      const items = await Promise.all(orderItems.map(async (item) => {
        const productInstance = productInstances.find(p => p.id === item.productId);
        const product = products.find(p => p.id === productInstance?.productId);
        const price = productInstance?.price || 0;
        const discountPercent = productInstance?.discountPercent || 0;
        const discountedPrice = price * (100 - discountPercent) / 100;

        let imageUrl = null;
        if (productInstance) {
          const images = await this.productImgService.getProductImgByProductInstanceId(productInstance.id);
          if (images && images.length > 0) {
            imageUrl = images[0].link;
          }
        }

        return {
          productId: product?.id,
          instanceId: productInstance?.id,
          productName: product?.name || 'Unknown',
          instanceName: productInstance?.name,
          quantity: item.quantity,
          price,
          discountPercent,
          subTotal: discountedPrice * item.quantity,
          imageUrl
        };
      }));

      const totalPrice = items.reduce((sum, item) => sum + item.subTotal, 0);

      if (payments) {
        for (const payment of payments) {
          results.push({
            orderId: order.id,
            status: order.status,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            totalPrice,
            paymentMethod: payment.paymentMethod,
            paymentStatus: payment.paymentStatus,
            buyer: {
              id: user.id,
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber,
              username: user.username,
              role: user.role,
              status: user.status,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              deletedAt: user.deletedAt
            },
            items
          });
        }
      }
    }

    return results;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderRepository.save({
      status: OrderStatus.IN_PROGRESS,
      shippingAddress: createOrderDto.address,
      userId: createOrderDto.userId,
      updatedAt: new Date()
    }).then(
      async order => {
        for (const prodItem of createOrderDto.data) {
          const orderItem = this.orderItemsRepository.create({ 
            productId: prodItem.key,
            quantity: prodItem.quantity,
            orderId: order.id
          });
          this.orderItemsRepository.save(orderItem);

          const prodInstance = await this.productInstanceRepository.findProductInstanceById(prodItem.key);
          prodInstance.quantity -= prodItem.quantity;
          this.productInstanceRepository.updateProductInstance(prodInstance.id, {...prodInstance});
        }

        // create payment
        const newPayment = new PaymentEntity();
        newPayment.orderId = order.id;
        newPayment.paymentMethod = createOrderDto.paymentMethod;
        newPayment.paymentStatus = PaymentStatus.PENDING;
        newPayment.amount = createOrderDto.total;
        this.paymentRepository.save(newPayment);

        return this.orderRepository.save(order);
      }
    );
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

  async getOrdersByUser(userId: string): Promise<OrderDetailDto[]> {
    const orders = await this.orderRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });

    const results: OrderDetailDto[] = [];

    for (const order of orders) {
      const orderItems = await this.orderItemsRepository.find({ where: { orderId: order.id } });
      const payments = await this.paymentRepository.find({ where: { orderId: order.id } });
      const user = await this.userRepository.findOneBy({ id: order.userId });

      const productInstances = [];
      const products = [];
      for (const item of orderItems) {
        const productInstance = await this.productInstanceRepository.findProductInstanceById(item?.productId);
        const product = await this.productRepository.findProductById(productInstance?.productId);

        productInstances.push(productInstance);
        products.push(product);
      }

      const items = await Promise.all(orderItems.map(async (item) => {
        const productInstance = productInstances.find(p => p.id === item.productId);
        const product = products.find(p => p.id === productInstance?.productId);
        const price = productInstance?.price || 0;
        const discountPercent = productInstance?.discountPercent || 0;
        const discountedPrice = price * (100 - discountPercent) / 100;

        let imageUrl = null;
        if (productInstance) {
          const images = await this.productImgService.getProductImgByProductInstanceId(productInstance.id);
          if (images && images.length > 0) {
            imageUrl = images[0].link;
          }
        }

        return {
          productId: product?.id,
          instanceId: productInstance?.id,
          productName: product?.name || 'Unknown',
          instanceName: productInstance?.name,
          quantity: item.quantity,
          price,
          discountPercent,
          subTotal: discountedPrice * item.quantity,
          imageUrl
        };
      }));

      const totalPrice = items.reduce((sum, item) => sum + item.subTotal, 0);

      if (payments) {
        for (const payment of payments) {
          results.push({
            orderId: order.id,
            status: order.status,
            shippingAddress: order.shippingAddress,
            createdAt: order.createdAt,
            totalPrice,
            paymentMethod: payment.paymentMethod,
            paymentStatus: payment.paymentStatus,
            buyer: {
              id: user.id,
              name: user.name,
              email: user.email,
              phoneNumber: user.phoneNumber,
              username: user.username,
              role: user.role,
              status: user.status,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              deletedAt: user.deletedAt
            },
            items
          });
        }
      }
    }

    return results;
  }
  async getOrderDetail(orderId: string): Promise<OrderDetailDto> {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException('Order not found');

    const orderItems = await this.orderItemsRepository.find({ where: { orderId } });
    const payment = await this.paymentRepository.findOneBy({ orderId: order.id });
    const user = await this.userRepository.findOneBy({ id: order.userId });

    const productInstances = [];
    const products = [];
    for (const item of orderItems) {
      const productInstance = await this.productInstanceRepository.findProductInstanceById(item?.productId);
      const product = await this.productRepository.findProductById(productInstance?.productId);

      productInstances.push(productInstance);
      products.push(product);
    }

    const items = await Promise.all(orderItems.map(async (item) => {
      const productInstance = productInstances.find(p => p.id === item.productId);
      const product = products.find(p => p.id === productInstance?.productId);
      const price = productInstance?.price || 0;
      const discountPercent = productInstance?.discountPercent || 0;
      const discountedPrice = price * (100 - discountPercent) / 100;
    
      let imageUrl = null;
      if (productInstance) {
        const images = await this.productImgService.getProductImgByProductInstanceId(productInstance.id);
        if (images && images.length > 0) {
          imageUrl = images[0].link;
        }
      }

      return {
          productId: product?.id,
          instanceId: productInstance?.id,
          productName: product?.name || 'Unknown',
          instanceName: productInstance?.name,
          quantity: item.quantity,
          price,
          discountPercent,
          subTotal: discountedPrice * item.quantity,
          imageUrl
        };
    }));

    const totalPrice = items.reduce((sum, item) => sum + item.subTotal, 0);

    return {
      orderId: order.id,
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      totalPrice,
      paymentMethod: payment?.paymentMethod,
      paymentStatus: payment?.paymentStatus,
      buyer: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        username: user.username,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
      },
      items
    };
  }

  async cancelOrder(id: string): Promise<UpdateResult> {
    const order = await this.orderRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    // Optional: prevent cancel if already completed or cancelled
    if (order.status === OrderStatus.RECEIVED || order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('Cannot cancel a completed or already cancelled order');
    }

    return this.orderRepository.update(id, { status: OrderStatus.CANCELLED });
  }

  async getOrderStats(filterDto: OrderStatsFilterDto): Promise<OrderStatsDto> {
    const { startDate, endDate } = filterDto;

    const query = this.orderRepository.createQueryBuilder('order');

    if (startDate) {
      query.andWhere('order.created_at >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('order.created_at <= :endDate', { endDate });
    }

    const orders = await query.getMany();
    const totalOrders = orders.length;

    let totalRevenue = 0;
    const ordersByStatus: Record<string, number> = {};
    const revenueByDay: Record<string, number> = {};

    for (const order of orders) {
      // Get order items for this order
      const orderItems = await this.orderItemsRepository.find({
        where: { orderId: order.id }
      });

      // Calculate order total using product_instance prices
      let orderTotal = 0;
      for (const item of orderItems) {
        // Get product instance details
        const productInstance = await this.productInstanceRepository.findProductInstanceById(item.productId);

        if (productInstance) {
          orderTotal += productInstance.price * item.quantity;
        }
      }

      totalRevenue += orderTotal;

      // Count by status
      ordersByStatus[order.status] = (ordersByStatus[order.status] || 0) + 1;

      // Group by day
      const day = order.createdAt.toISOString().slice(0, 10); // yyyy-mm-dd
      revenueByDay[day] = (revenueByDay[day] || 0) + orderTotal;
    }

    return {
      totalOrders,
      totalRevenue,
      ordersByStatus,
      revenueByDay: Object.entries(revenueByDay).map(([date, revenue]) => ({
        date,
        revenue
      }))
    };
  }
}
