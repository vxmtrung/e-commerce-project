import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductInstanceEntity } from "./product-instance.entity";

@Entity('product_img')
export class ProductImgEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => ProductInstanceEntity, (productInstance) => productInstance.img)
  // productInstance: ProductInstanceEntity;
  @Column({ nullable: false })
  productInstanceId: string;

  @Column({ nullable: false })
  link: string;

  @Column({ nullable: false, default: true })
  status: boolean;
}