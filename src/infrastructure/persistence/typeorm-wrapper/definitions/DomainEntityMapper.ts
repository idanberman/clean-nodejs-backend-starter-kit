import { DomainEntity } from 'src/domain/kernel/ddd';
import { ValidEntityUid } from 'src/domain/kernel/ddd/object-identity';
import { TypeormEntity } from './TypeormEntity';

export interface PersistentToDomainEntityMapper<
  DomainEntityType extends DomainEntity<any, any>,
  PersistentEntityType extends TypeormEntity<ValidEntityUid>
> {
  mapFromPersistent(persistentEntity: PersistentEntityType): DomainEntityType;
  mapToPersistent(domainEntity: DomainEntityType): PersistentEntityType;
}
