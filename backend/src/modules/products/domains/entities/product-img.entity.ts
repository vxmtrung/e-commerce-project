import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
