import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  // @OneToMany(() => ProductInstanceEntity, (productInstance) => productInstance.product)
  // productInstances: ProductInstanceEntity[];
  // productInstanceIds: string[];

  @Column({ nullable: false })
  categoryId: string;

  @Column({ nullable: false })
  brandId: string;

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
