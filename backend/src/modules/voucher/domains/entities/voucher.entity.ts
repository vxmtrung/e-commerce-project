import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DiscountType } from '../../../../constants/discount-type.constant';
import { ApiProperty } from '@nestjs/swagger';

@Entity('vouchers')
export class VoucherEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, unique: true })
  code: string;

  @ApiProperty()
  @Column({ nullable: false })
  description: string;

  @ApiProperty()
  @Column({ nullable: false })
  discountType: DiscountType;

  @ApiProperty()
  @Column({ nullable: false })
  discountValue: number;

  @ApiProperty()
  @Column({ nullable: false })
  quantity: number;

  @ApiProperty()
  @Column({ nullable: false, default: 0 })
  usedQuantity: number;

  @ApiProperty()
  @Column({ nullable: false })
  startDate: Date;

  @ApiProperty()
  @Column({ nullable: false })
  endDate: Date;

  @ApiProperty()
  @Column({ nullable: false, default: true })
  isActive: boolean;
}
