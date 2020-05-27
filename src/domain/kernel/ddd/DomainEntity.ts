import { DomainObjectIdentity, ValidEntityUid } from './object-identity';
import { ObjectCloningHelper } from '../building-blocks/tools';
import { ValidEntityProperties } from '../building-blocks/types/types';

export abstract class DomainEntity<
  T extends ValidEntityUid,
  Properties extends ValidEntityProperties
> {
  private readonly _entityIdentity: DomainObjectIdentity<T>;
  protected _properties: Properties;
  constructor(uid: T, aggregateType: string, properties: Properties) {
    this._entityIdentity = new DomainObjectIdentity(uid, aggregateType);
    this._properties = ObjectCloningHelper.clone(properties);
    Object.freeze(this);
  }

  public get version(): number {
    return this._properties.version as number;
  }

  public equals(other: any): boolean {
    return (
      other?.getIdentity && this._entityIdentity.equals(other.getIdentity())
    );
  }

  public getIdentity(): DomainObjectIdentity<T> {
    return this._entityIdentity;
  }

  public getRawProperties(): Readonly<Properties> {
    return this._properties;
  }

  public setRawProperties(properties: Properties): void {
    this._properties = properties;
  }
}
