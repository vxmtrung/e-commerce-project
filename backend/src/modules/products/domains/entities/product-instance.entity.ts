import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('product_instances')
export class ProductInstanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  quantity: number;

  // @ManyToOne(() => ProductEntity, (product) => product.productInstances, { cascade: true })
  // product: ProductEntity;
  @Column({ nullable: false })
  productId: string;

  // @OneToMany(() => ProductImgEntity, (productImg) => productImg.productInstance)
  // img: ProductImgEntity[];
  // imgIds: string[];

  @Column({ nullable: false, default: true })
  status: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp'
  })
  deletedAt: Date;
}
