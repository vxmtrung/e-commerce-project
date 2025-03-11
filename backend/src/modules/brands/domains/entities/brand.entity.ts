import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('brands')
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: true })
  status: boolean;
}