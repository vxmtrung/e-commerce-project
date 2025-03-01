import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./domains/entities/user.entity";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { ShippingAddressEntity } from "./domains/entities/shipping-address.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ShippingAddressEntity])],
  controllers: [],
  exports: ['IUserRepository', 'IUserService'],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'IUserService',
      useClass: UserService,
    }
  ]
})

export class UserModule {}