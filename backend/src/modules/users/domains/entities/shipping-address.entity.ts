import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('shipping_addresses')
export class ShippingAddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  receiverName: string;

  @Column({ nullable: false })
  receiverPhone: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  district: string;

  @Column({ nullable: false })
  town: string;

  @Column({ nullable: true })
  additionalInformation: string;

  @Column({ nullable: false, default: false })
  isDefault: boolean;

  @Column({ nullable: false, default: true })
  status: boolean;
}