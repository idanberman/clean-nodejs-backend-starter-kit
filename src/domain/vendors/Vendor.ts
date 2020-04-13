import { AggregateRoot, DomainObjectIdentity } from '../kernel/ddd';
import { VendorProperties } from './VendorProperties';
import { VendorsRepository } from './VendorsRepository';
import { CrudRepositoryOperation } from '../kernel/building-blocks/values';

export type VendorUidType = number;
export class Vendor
  extends AggregateRoot<
    VendorUidType,
    VendorProperties,
    CrudRepositoryOperation<VendorsRepository>
  >
  implements Readonly<VendorProperties> {
  constructor(domainObjectUuid: VendorUidType, properties: VendorProperties) {
    super(domainObjectUuid, 'Vendor', properties);
  }

  public get governmentalId(): string {
    return this.properties.governmentalId;
  }
  public get name(): string {
    return this.properties.name;
  }
  public get contactName(): string {
    return this.properties.contactName;
  }
  public get contactPhone(): string {
    return this.properties.contactPhone;
  }
  public get email(): string {
    return this.properties.email;
  }
  public get address(): string {
    return this.properties.address;
  }
  public get city(): string {
    return this.properties.city;
  }
  public get zipCode(): string {
    return this.properties.zipCode;
  }
  public get budgetClassification(): string {
    return this.properties.budgetClassification;
  }
  public get version(): number {
    return this.properties.version;
  }

  public static create(domainObjectUuid: VendorUidType): Vendor {
    return new Vendor(domainObjectUuid);
  }
}
