import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductInstanceEntity } from "./product-instance.entity";

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
  categoryName: string;

  @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;
  
  @UpdateDateColumn({
      type: 'timestamp',
    })
    updatedAt: Date;
  
  @DeleteDateColumn({
      type: 'timestamp',
    })
    deletedAt: Date;
}