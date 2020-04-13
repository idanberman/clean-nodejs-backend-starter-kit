import { ValueObject } from '../ValueObject';
import { StandardUuid } from './StandardUuid';

export type ValidEntityUid =
  | string
  | StandardUuid
  | number
  | { [key: string]: number | string };

export type DomainObjectIdentityProperties<T extends ValidEntityUid> = {
  readonly domainObjectType: string;
  readonly domainObjectUuid: T;
};
export class DomainObjectIdentity<T extends ValidEntityUid>
  extends ValueObject<DomainObjectIdentityProperties<T>>
  implements Readonly<DomainObjectIdentityProperties<T>> {
  constructor(domainObjectUuid: T, domainObjectType: string) {
    const properties: DomainObjectIdentityProperties<T> = {
      domainObjectUuid,
      domainObjectType,
    };
    super(properties);
  }

  get domainObjectUuid(): T {
    return this.properties.domainObjectUuid;
  }
  get domainObjectType(): string {
    return this.properties.domainObjectType;
  }
  public equals(other: any): boolean {
    if (!other.domainObjectUuid || !other.domainObjectType) {
      return false;
    }

    return (
      this.domainObjectUuid === other.domainObjectType &&
      this.domainObjectType === other.domainObjectType
    );
  }
}
