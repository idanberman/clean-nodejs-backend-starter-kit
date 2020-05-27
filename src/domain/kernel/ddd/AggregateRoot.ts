import {
  DomainObjectIdentity,
  ValidEntityUid,
  StandardUuid,
} from './object-identity';
import { DomainEntity } from './DomainEntity';
import { DomainRepository } from './DomainRepository';
import { DomainEvent } from './DomainEvent';
import { CrudRepositoryOperation } from 'src/app/values';
import { ValidEntityProperties } from '../building-blocks/types/types';

export type AggregateRootProperties = { version: number };
export type PersistentDataBlock = CrudRepositoryOperation<DomainRepository>;

export abstract class AggregateRoot<
  AggregatePropertiesType extends ValidEntityProperties &
    AggregateRootProperties,
  AggregatePersistentDataBlocksType extends PersistentDataBlock
> extends DomainEntity<StandardUuid, AggregatePropertiesType> {
  private _persistentDataBlocks: AggregatePersistentDataBlocksType[];
  private _domainEventsToBePublished: DomainEvent<any>[];

  constructor(
    aggregateUid: StandardUuid,
    aggregateType: string,
    properties: AggregatePropertiesType,
  ) {
    super(aggregateUid, aggregateType, properties);
    this._persistentDataBlocks = [];
    this._domainEventsToBePublished = [];
  }

  protected addEvent(event: DomainEvent<any>): void {
    this._domainEventsToBePublished.push(event);
  }

  public fetchEventsForPublish(): DomainEvent<any>[] {
    const events: DomainEvent<any>[] = this._domainEventsToBePublished;
    this._domainEventsToBePublished = [];
    return events;
  }

  protected addPersistentDataBlock(
    persistentDataBlock: AggregatePersistentDataBlocksType,
  ): void {
    this._persistentDataBlocks.push(persistentDataBlock);
  }

  public fetchPersistentDataBlocks(): PersistentDataBlock[] {
    const blocks: AggregatePersistentDataBlocksType[] = Array.from(
      this._persistentDataBlocks,
    );
    this._persistentDataBlocks = [];
    return blocks;
  }
}
