import { TypeormEntity } from '../../persistence/typeorm-wrapper/definitions/TypeormEntity';
import { Vendor } from 'src/domain/vendors';
import { VendorProperties } from 'src/domain/vendors/VendorProperties';
import {
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  PrimaryColumn,
} from 'typeorm';
import { StandardUuid } from 'src/domain/kernel/ddd/object-identity';

export class VendorPersistentEntity extends TypeormEntity<StandardUuid>
  implements VendorProperties {
  constructor() {
    super(['uuid']);
  }

  @PrimaryColumn('char', {
    length: 32,
    transformer: {
      from: (uuid: StandardUuid) => uuid.value,
      to: (uuidString: string) => StandardUuid.createFrom(uuidString),
    },
  })
  public readonly uid: StandardUuid;

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
