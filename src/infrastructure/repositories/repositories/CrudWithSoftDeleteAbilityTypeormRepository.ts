import { CrudTypeormRepository } from './CrudTypeormRepository';
import {
  SoftDeletedRepository,
  HasSoftDeleteAbilityEntity,
  BaseEntity,
} from 'src/domain/interfaces';
import {
  WriteResourceNotFoundError,
  InvalidInputError,
} from 'src/domain/errors/operation';
import { DeepPartial, ObjectType, EntityManager } from 'typeorm';

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

    // if (!!dbEntity.deletedAt === deleted) {
    //   throw new InvalidInputError('Entity already in desire state');
    // }
    await this.typeormRepository.save(
      ({
        ...dbEntity,
        deletedAt: new Date(),
      } as unknown) as DeepPartial<T>,
      { reload: true },
    );
  }
}
