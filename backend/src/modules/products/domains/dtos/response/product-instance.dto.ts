import { ProductImgEntity } from '../../entities/product-img.entity';
import { ProductInstanceEntity } from '../../entities/product-instance.entity';

export class ProductInstanceDto {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  productImgs: ProductImgEntity[];

  constructor(productInstance: ProductInstanceEntity, productImgs: ProductImgEntity[]) {
    this.id = productInstance.id;
    this.name = productInstance.name;
    this.price = productInstance.price;
    this.quantity = productInstance.quantity;
    this.productImgs = productImgs;
  }
}
