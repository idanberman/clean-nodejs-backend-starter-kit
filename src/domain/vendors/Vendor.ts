import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';
import { VendorDto } from './VendorDto';
import { BaseEntity } from '../kernel/ddd';
import { SimplePlainObject } from '../kernel/building-blocks/SimplePlainObject';
import { VendorProperties } from './VendorProperties';
export class Vendor extends BaseEntity {
  private constructor(properties: Partial<Vendor>, id?: number) {
    Object.assign(this, { ...properties, id: undefined });
  }
  public readonly id: number;
  public readonly deletedAt: Date;
  public readonly governmentalId: string;
  public readonly name: string;
  public readonly contactName: string;
  public readonly contactPhone: string;
  public readonly email: string;
  public readonly address: string;
  public readonly city: string;
  public readonly zipCode: string;
  public readonly budgetClassification: string;
  public readonly version: number;
  public getId() {
    return this.id;
  }

  public static build(partialEntity: Partial<VendorProperties>): Vendor {
    return new Vendor(partialEntity);
  }
}
