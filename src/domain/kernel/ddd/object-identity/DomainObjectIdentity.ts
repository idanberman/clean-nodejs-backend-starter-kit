import { ValueObject } from '../ValueObject';
import { StandardUuid } from './StandardUuid';

export type ValidEntityUid =
  | string
  | StandardUuid
  | number
  | { [key: string]: number | string };

export type DomainObjectIdentityProperties<T extends ValidEntityUid> = {
  readonly domainObjectType: string;
  readonly domainObjectUid: T;
};
export class DomainObjectIdentity<T extends ValidEntityUid>
  extends ValueObject<DomainObjectIdentityProperties<T>>
  implements Readonly<DomainObjectIdentityProperties<T>> {
  constructor(domainObjectUid: T, domainObjectType: string) {
    const properties: DomainObjectIdentityProperties<T> = {
      domainObjectUid,
      domainObjectType,
    };
    super(properties);
  }

  get domainObjectUid(): T {
    return this._properties.domainObjectUid;
  }
  get domainObjectType(): string {
    return this._properties.domainObjectType;
  }
  public equals(other: any): boolean {
    if (!other.domainObjectUid || !other.domainObjectType) {
      return false;
    }

    return (
      this.domainObjectUid === other.domainObjectType &&
      this.domainObjectType === other.domainObjectType
    );
  }
}
