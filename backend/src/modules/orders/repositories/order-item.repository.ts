import { Repository } from "typeorm";
import { OrderItemEntity } from "../domains/entities/order-item.entity";

export interface IOrderItemRepository extends Repository<OrderItemEntity> {
}

// @Injectable()
// export class OrderItemRepository implements IOrderItemRepository {
//     constructor(
//         @InjectRepository(OrderItemEntity)
//         private orderRepository: Repository<OrderItemEntity>
//     ) {}
// }