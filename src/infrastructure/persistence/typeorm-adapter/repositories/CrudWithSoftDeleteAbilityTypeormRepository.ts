import { CrudTypeormRepository } from './CrudTypeormRepository';
import { SoftDeletedRepository } from 'src/domain/interfaces';
import { WriteResourceNotFoundError } from 'src/domain/kernel/errors/operation';
import { DeepPartial, ObjectType, EntityManager } from 'typeorm';
import { HasSoftDeleteAbilityEntity } from 'src/domain/kernel/building-blocks';
import { BaseEntity } from 'src/domain/kernel/ddd';

// tslint:disable-next-line: no-empty-interface
interface BaseEntityAndHasSoftDeleteAbilityEntity
  extends BaseEntity,
    HasSoftDeleteAbilityEntity {}

export class CrudWithSoftDeleteAbilityTypeormRepository<
  T extends BaseEntityAndHasSoftDeleteAbilityEntity
> extends CrudTypeormRepository<T> implements SoftDeletedRepository<T> {
  constructor(target: ObjectType<T>, manager: EntityManager) {
    super(target, manager);
  }
  public async setSoftDeleted(id: number, deleted: boolean): Promise<void> {
    let dbEntity: T;
    try {
      dbEntity = await this.findOneOrError(id);
    } catch (error) {
      throw new WriteResourceNotFoundError('id', String(id));
    }

    await this.typeormRepository.save(
      ({
        ...dbEntity,
        deletedAt: new Date(),
      } as unknown) as DeepPartial<T>,
      { reload: true },
    );
  }
}
