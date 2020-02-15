import { BasicWriteRepository } from '.';
import { HasSoftDeleteAbilityEntity, BaseEntity } from '../definitions';

export interface SoftDeletedRepository<
  T extends HasSoftDeleteAbilityEntity & BaseEntity
> extends BasicWriteRepository<T> {
  setSoftDeleted(id: number, deleted: boolean): Promise<void>;
}
