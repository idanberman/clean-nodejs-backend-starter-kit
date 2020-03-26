import { BasicWriteRepository } from '.';
import { HasSoftDeleteAbilityEntity } from '../kernel/building-blocks';
import { BaseEntity } from '../kernel/ddd';

export interface SoftDeletedRepository<
  T extends HasSoftDeleteAbilityEntity & BaseEntity
> extends BasicWriteRepository<T> {
  setSoftDeleted(id: number, deleted: boolean): Promise<void>;
}
