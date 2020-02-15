import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { VendorDto } from './VendorDto';
import { BaseEntityDto } from '../definitions/BaseEntityDto';
import { BaseEntity } from '../definitions';

@Entity()
export class Vendor implements BaseEntity {
  private constructor(properties: Partial<Vendor>, id?: number) {
    Object.assign(this, { ...properties, id: undefined });
  }
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column('date', { nullable: true, default: null })
  public readonly deletedAt: Date;

  @Column('varchar', { length: 32, unique: true })
  public readonly governmentalId: string;

  @Column('varchar', { length: 200 })
  public readonly name: string;

  @Column('varchar', { length: 60 })
  public readonly contactName: string;

  @Column('varchar', { length: 15 })
  public readonly contactPhone: string;

  @Column('varchar', { length: 254 })
  public readonly email: string;

  @Column('varchar', { length: 254 })
  public readonly address: string;

  @Column('varchar', { length: 100 })
  public readonly city: string;

  @Column('varchar', { length: 10 })
  public readonly zipCode: string;

  @Column('varchar', { length: 254, default: '' })
  public readonly budgetClassification: string;

  @VersionColumn()
  public readonly version: number;

  public getId() {
    return this.id;
  }

  public toDto(): BaseEntityDto {
    return VendorDto.createFromData(this);
  }
  public static build(partialEntity: Partial<Vendor>): Vendor {
    return new Vendor(partialEntity);
  }
}
