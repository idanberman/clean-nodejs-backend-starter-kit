import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  governmentalId: string;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  contactPhone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  budgetClassification: string;
}
