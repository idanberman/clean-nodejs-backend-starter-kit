import { PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

export class TypeormDbEntity {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @VersionColumn()
  public readonly version: number;
}
