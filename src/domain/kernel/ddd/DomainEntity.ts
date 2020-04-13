import { DomainObjectIdentity, ValidEntityUid } from './object-identity';
import {
  SimplePlainObject,
  ValidPropertiesMap,
} from '../building-blocks/types';
import { ObjectTools } from '../building-blocks/tools/ObjectTools';

export abstract class DomainEntity<
  T extends ValidEntityUid,
  Properties extends ValidPropertiesMap
> {
  private readonly entityIdentity: DomainObjectIdentity<T>;
  protected properties: Properties;
  constructor(uid: T, aggregateType: string, properties: Properties) {
    this.entityIdentity = new DomainObjectIdentity(uid, aggregateType);
    this.properties = ObjectTools.clone(properties);
    Object.freeze(this);
  }

  public equals(other: any): boolean {
    return (
      other?.getIdentity && this.entityIdentity.equals(other.getIdentity())
    );
  }

  public getIdentity(): DomainObjectIdentity<T> {
    return this.entityIdentity;
  }

  public getRawProperties(): Readonly<Properties> {
    return this.properties;
  }

  public setRawProperties(properties: Properties): void {
    this.properties = properties;
  }
}
