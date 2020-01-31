import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { BaseEntity } from '../interfaces';
import { BaseEntityDto } from '../interfaces/BaseEntityDto';
import { VendorDto } from './VendorDto';

@Entity()
export class Vendor implements BaseEntity {
  private constructor(properties: Partial<Vendor>, id?: number) {
    Object.assign(this, { ...properties, id: undefined });
  }
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Index({ unique: true })
  @Column('varchar', { length: 32 })
  readonly governmentalId: string;

  @Column('varchar', { length: 200 })
  readonly name: string;

  @Column('varchar', { length: 60 })
  readonly contactName: string;

  @Column('varchar', { length: 15 })
  readonly contactPhone: string;

  @Column('varchar', { length: 254 })
  readonly email: string;

  @Column('varchar', { length: 254 })
  readonly address: string;

  @Column('varchar', { length: 100 })
  readonly city: string;

  @Column('varchar', { length: 10 })
  readonly zipCode: string;

  @Column('varchar', { length: 254 })
  readonly budgetClassification: string;

  @VersionColumn()
  version: number;

  getId() {
    return this.getId();
  }

  toDto(): BaseEntityDto {
    return new VendorDto(this);
  }
  public static build(partialEntity: Partial<Vendor>): Vendor {
    return new Vendor(partialEntity);
  }
}
