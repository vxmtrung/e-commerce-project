import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
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
  @Column({ nullable: false, default: true })
  status: boolean;

  // @OneToMany(() => ProductInstanceEntity, (productInstance) => productInstance.product)
  // productInstances: ProductInstanceEntity[];
  // productInstanceIds: string[];

  @ApiProperty()
  @Column({ nullable: false })
  categoryId: string;

  @ApiProperty()
  @Column({ nullable: false })
  brandId: string;

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
