import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  @Column('integer')
  readonly id: number;

  @Index({ unique: true })
  @Column('string', { length: 32 })
  readonly governmentalId: string;

  @Column('string', { length: 200 })
  readonly name: string;

  @Column('string', { length: 60 })
  readonly contactName: string;

  @Column('string', { length: 15 })
  readonly contactPhone: string;

  @Column('string', { length: 254 })
  readonly email: string;

  @Column('string', { length: 254 })
  readonly address: string;

  @Column('string', { length: 100 })
  readonly city: string;

  @Column('string', { length: 10 })
  readonly zipCode: string;

  @Column('string', { length: 254 })
  readonly budgetClassification: string;

  @VersionColumn()
  version: number;
}
