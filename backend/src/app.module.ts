import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { CategoryModule } from './modules/categories/category.module';
import { OrderModule } from './modules/orders/order.module';
import { PaymentModule } from './modules/payments/payment.module';
import { ProductModule } from './modules/products/product.module';
import { ReviewModule } from './modules/reviews/review.module';
import { BrandModule } from './modules/brands/brand.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    OrderModule,
    PaymentModule,
    ProductModule,
    ReviewModule,
    BrandModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<string>('DB') == 'deployed'
          ? {
              name: 'default',
              type: 'postgres',
              url: configService.get<string>('DB_URL'),
              namingStrategy: new SnakeNamingStrategy(),
              entities: [
                __dirname + '/**/*.entity.{ts,js}',
                __dirname + '/modules/**/**/entities/*.entity{.ts,.js}',
                __dirname + '/modules/**/*.view-entity{.ts,.js}'
              ],
              migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
              logging: true,
              synchronize: false,
              migrationsRun: false
            }
          : {
              name: 'default',
              type: 'postgres',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              database: configService.get<string>('DB_DATABASE'),
              namingStrategy: new SnakeNamingStrategy(),
              entities: [
                __dirname + '/**/*.entity.{ts,js}',
                __dirname + '/modules/**/**/entities/*.entity{.ts,.js}',
                __dirname + '/modules/**/*.view-entity{.ts,.js}'
              ],
              migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
              logging: true,
              synchronize: false,
              migrationsRun: false
            },
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid Options Passed');
        }

        return Promise.resolve(addTransactionalDataSource(new DataSource(options)));
      }
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
