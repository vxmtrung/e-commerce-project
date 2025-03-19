import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './domains/entities/brand.entity';
import { BrandController } from './controllers/brand.controller';
import { BrandRepository } from './repositories/brand.repository';
import { BrandService } from './services/brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [BrandController],
  exports: ['IBrandRepository', 'IBrandService'],
  providers: [
    {
      provide: 'IBrandRepository',
      useClass: BrandRepository
    },
    {
      provide: 'IBrandService',
      useClass: BrandService
    }
  ]
})
export class BrandModule {}
