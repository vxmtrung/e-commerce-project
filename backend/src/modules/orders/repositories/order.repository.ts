import { Repository } from 'typeorm';
import { OrderEntity } from '../domains/entities/order.entity';

export interface IOrderRepository extends Repository<OrderEntity> {}

// @Injectable()
// export class OrderRepository implements IOrderRepository {
//     constructor(
//         @InjectRepository(OrderEntity)
//         private orderRepository: Repository<OrderEntity>
//     ) {}
// }
