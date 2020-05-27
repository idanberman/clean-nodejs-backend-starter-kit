import { DomainEntity } from 'src/domain/kernel/ddd';
import { Constructor } from 'src/domain/kernel/building-blocks/types';
import { PlainObject } from 'src/domain/kernel/building-blocks/types';
import {
  TypeormEntity,
  PersistentToDomainEntityMapper,
} from '../../definitions';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';

export class DomainEntityMapperGenerator {
  public generate<
    DomainEntityType extends DomainEntity<any, any>,
    PersistentEntityType extends TypeormEntity<any>
  >(
    domainEntityClass: Constructor<DomainEntityType>,
    persistentEntityClass: Constructor<PersistentEntityType>,
    properties:
      | (keyof DomainEntityType & keyof PersistentEntityType)[]
      | Constructor<PlainObject>,
  ): PersistentToDomainEntityMapper<DomainEntityType, PersistentEntityType> {
    return {
      mapFromPersistent: this.generateMapFromPersistent(
        domainEntityClass,
        persistentEntityClass,
        properties,
      ),
      mapToPersistent: this.generateMapToPersistent(
        domainEntityClass,
        persistentEntityClass,
        properties,
      ),
    };
  }

  public generateMapFromPersistent<
    DomainEntityType extends Constructor<DomainEntity<ValidEntityUid, any>>,
    PersistentEntityType extends Constructor<TypeormEntity<ValidEntityUid>>
  >(
    domainEntityClass: Constructor<DomainEntityType>,
    persistentEntityClass: Constructor<PersistentEntityType>,
    properties:
      | (keyof DomainEntityType & keyof PersistentEntityType)[]
      | Constructor<PlainObject>,
  ): (persistentEntity: PersistentEntityType) => DomainEntityType {
    return (persistentEntity: PersistentEntityType) => {
      const domainEntity: DomainEntityType = new domainEntityClass(
        persistentEntity.getIdValue(),
      );
      this.copyProperties();
      return domainEntity;
    };
  }
  generateMapToPersistent<
    DomainEntityType extends Constructor<DomainEntity<any, any>>,
    PersistentEntityType extends Constructor<TypeormEntity<ValidEntityUid>>
  >(
    domainEntityClass: Constructor<DomainEntityType>,
    persistentEntityClass: Constructor<PersistentEntityType>,
    properties:
      | (keyof DomainEntityType & keyof PersistentEntityType)[]
      | Constructor<PlainObject>,
  );

  copyProperties<
    DomainEntityType extends Constructor<DomainEntity<any, any>>,
    PersistentEntityType extends Constructor<TypeormEntity<ValidEntityUid>>
  >(
    domainEntityType: DomainEntityType,
    persistentEntityType: PersistentEntityType,
    properties: (keyof DomainEntityType & keyof PersistentEntityType)[],
  ) {}
}
