import { PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { DbEntityUuidType } from './DbEntityUuidType';

export class TypeormEntity<T extends DbEntityUuidType> {
  constructor(
    @PrimaryGeneratedColumn('increment')
    public readonly id: T,
  ) {}
  @VersionColumn()
  public readonly version: number;

  public getId(): Readonly<T> {
    return this.id;
  }
}
