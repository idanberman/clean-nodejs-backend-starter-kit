import { PrimaryGeneratedColumn, VersionColumn, EntitySchema } from 'typeorm';
import { ValidDbEntityUuid } from './DbEntityUuidType';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';

export class TypeormEntity<T extends ValidDbEntityUuid>
  implements EntitySchema<any> {
  constructor(public readonly options: EntitySchemaOptions<any>) {}

  @PrimaryGeneratedColumn('increment')
  public readonly id: T;
  @VersionColumn()
  public readonly version: number;

  public getId(): Readonly<T> {
    return this.id;
  }
}
