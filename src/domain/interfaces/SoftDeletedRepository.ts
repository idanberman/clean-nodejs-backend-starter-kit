import {
  BasicWriteRepository,
  BaseEntity,
  HasSoftDeleteAbilityEntity,
} from '.';

export interface SoftDeletedRepository<
  T extends HasSoftDeleteAbilityEntity & BaseEntity
> extends BasicWriteRepository<T> {
  setSoftDeleted(id: number, deleted: boolean): Promise<void>;
}
