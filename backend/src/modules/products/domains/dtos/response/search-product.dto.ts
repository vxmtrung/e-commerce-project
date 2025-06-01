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
  lowestInstance: ProductInstanceDto;

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

    const lowestInstance = productInstances.reduce((minPd, currentPd) => {
      const minPrice = (minPd.price * (100 - minPd.discountPercent)) / 100;
      const currentPrice = (currentPd.price * (100 - currentPd.discountPercent)) / 100;

      return currentPrice < minPrice ? currentPd : minPd;
    });

    this.lowestInstance = lowestInstance;

    this.lowestPrice = Math.round((lowestInstance.price * (100 - lowestInstance.discountPercent)) / 100);

    this.highestPrice = Math.round(
      Math.max(...productInstances.map((pd) => (pd.price * (100 - pd.discountPercent)) / 100))
    );
    this.category = category;
    this.brand = brand;
    this.productInstances = productInstances;
  }
}
