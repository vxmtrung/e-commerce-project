import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_img')
export class ProductImgEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => ProductInstanceEntity, (productInstance) => productInstance.img)
  // productInstance: ProductInstanceEntity;
  @ApiProperty()
  @Column({ nullable: false })
  productInstanceId: string;

  @ApiProperty()
  @Column({ nullable: false })
  link: string;

  @ApiProperty()
  @Column({ nullable: false, default: true })
  status: boolean;
}
