import { ApiProperty } from '@nestjs/swagger';
import { BrandEntity } from '../../../../brands/domains/entities/brand.entity';
import { CategoryEntity } from '../../../../categories/domains/entities/category.entity';
import { ProductEntity } from '../../entities/product.entity';
import { ProductInstanceDto } from './product-instance.dto';

export class SearchProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  category: CategoryEntity;

  @ApiProperty()
  brand: BrandEntity;

  @ApiProperty()
  lowestPrice: number;

  @ApiProperty()
  highestPrice: number;

  @ApiProperty()
  productInstances: ProductInstanceDto[];

  constructor(
    product: ProductEntity,
    category: CategoryEntity,
    brand: BrandEntity,
    productInstances: ProductInstanceDto[]
  ) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.status = product.status;
    this.lowestPrice = productInstances[0].price;
    this.highestPrice = productInstances[productInstances.length - 1].price;
    this.category = category;
    this.brand = brand;
    this.productInstances = productInstances;
  }
}
