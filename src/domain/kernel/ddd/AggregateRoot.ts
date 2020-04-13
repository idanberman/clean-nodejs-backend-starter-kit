import { DomainObjectIdentity, ValidEntityUid } from './object-identity';
import { DomainEntity } from './DomainEntity';
import { DomainRepository } from './DomainRepository';
import { DomainEvent } from './DomainEvent';
import { CrudRepositoryOperation } from '../building-blocks/values';

export type AggregateRootProperties = { version: number };
export type PersistentDataBlock = CrudRepositoryOperation<DomainRepository>;

export abstract class AggregateRoot<
  AggregateIdType extends ValidEntityUid,
  AggregatePropertiesType extends AggregateRootProperties,
  AggregatePersistentDataBlocksType extends PersistentDataBlock
> extends DomainEntity<AggregateIdType, AggregatePropertiesType> {
  private persistentDataBlocks: AggregatePersistentDataBlocksType[];
  private domainEventsToBePublished: DomainEvent<any>[];

  constructor(
    aggregateUid: AggregateIdType,
    aggregateType: string,
    properties: AggregatePropertiesType,
  ) {
    super(aggregateUid, aggregateType, properties);
    this.persistentDataBlocks = [];
    this.domainEventsToBePublished = [];
  }

  protected addEvent(event: DomainEvent<any>): void {
    this.domainEventsToBePublished.push(event);
  }

  public fetchEventsForPublish(): DomainEvent<any>[] {
    const events: DomainEvent<any>[] = this.domainEventsToBePublished;
    this.domainEventsToBePublished = [];
    return events;
  }

  protected addPersistentDataBlock(
    persistentDataBlock: AggregatePersistentDataBlocksType,
  ): void {
    this.persistentDataBlocks.push(persistentDataBlock);
  }

  protected fetchPersistentDataBlocks(): PersistentDataBlock[] {
    return Array.from(this.persistentDataBlocks);
  }
}
