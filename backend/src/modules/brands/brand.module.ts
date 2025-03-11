import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './domains/entities/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity])],
  controllers: [],
  exports: [],
  providers: []
})
export class BrandModule {}
