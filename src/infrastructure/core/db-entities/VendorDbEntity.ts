import { TypeormEntity } from '../../persistence/typeorm-adapter/definitions/TypeormEntity';
import { Vendor } from 'src/domain/vendors';
import { VendorProperties } from 'src/domain/vendors/VendorProperties';
import { PrimaryGeneratedColumn, Column, VersionColumn } from 'typeorm';

export class VendorDbEntity extends TypeormEntity<number>
  implements VendorProperties {
  private constructor(id: number) {
    super(id);
    Object.assign(this, properties, { id });
  }

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
}
