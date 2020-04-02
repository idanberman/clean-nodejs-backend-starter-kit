export type AggregateUuidType = string | number;
export class DomainObjectIdentity<T extends AggregateUuidType> {
  constructor(
    public readonly domainObjectUuid: T,
    public readonly domainObjectType: string,
  ) {}

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
