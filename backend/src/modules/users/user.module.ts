import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domains/entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { ShippingAddressEntity } from './domains/entities/shipping-address.entity';
import { UserController } from './controllers/user.controller';
import { AuthService } from '../auth/services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ShippingAddressEntity])],
  controllers: [UserController],
  exports: ['IUserRepository', 'IUserService'],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository
    },
    {
      provide: 'IUserService',
      useClass: UserService
    },
    {
      provide: 'IAuthService',
      useClass: AuthService
    }
  ]
})
export class UserModule {}
