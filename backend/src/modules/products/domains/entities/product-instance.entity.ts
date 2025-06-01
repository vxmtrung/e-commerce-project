import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('product_instances')
export class ProductInstanceEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;

  @ApiProperty()
  @Column({ nullable: false })
  quantity: number;

  // @ManyToOne(() => ProductEntity, (product) => product.productInstances, { cascade: true })
  // product: ProductEntity;
  @ApiProperty()
  @Column({ nullable: false })
  productId: string;

  // @OneToMany(() => ProductImgEntity, (productImg) => productImg.productInstance)
  // img: ProductImgEntity[];
  // imgIds: string[];

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  discountPercent: number;

  @ApiProperty()
  @Column({ nullable: false, default: true })
  status: boolean;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp'
  })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    type: 'timestamp'
  })
  deletedAt: Date;
}
