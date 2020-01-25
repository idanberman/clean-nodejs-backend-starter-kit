import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { injectable, inject } from 'inversify';
import { DomainType } from '../DomainType';
import { VendorsRepository, VendorDto } from '.';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Index({ unique: true })
  @Column()
  readonly governmentalId: string;

  @Column()
  readonly name: string;

  @Column()
  readonly contactName: string;

  @Column()
  readonly contactPhone: string;

  @Column()
  readonly email: string;

  @Column()
  readonly address: string;

  @Column()
  readonly city: string;

  @Column()
  readonly zipCode: string;

  @Column()
  readonly budgetClassification: string;
}
