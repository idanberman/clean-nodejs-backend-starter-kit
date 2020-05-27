import { AggregateRoot, DomainObjectIdentity } from '../kernel/ddd';
import { VendorProperties } from './VendorProperties';
import { VendorsRepository } from './VendorsRepository';
import { CrudRepositoryOperation } from 'src/app/values';
import { StandardUuid } from '../kernel/ddd/object-identity';

export type VendorUidType = StandardUuid;
export class Vendor
  extends AggregateRoot<
    VendorProperties,
    CrudRepositoryOperation<VendorsRepository>
  >
  implements Readonly<VendorProperties> {
  constructor(domainObjectUuid: StandardUuid, properties: VendorProperties) {
    super(domainObjectUuid ?? StandardUuid.create(), 'Vendor', properties);
  }

  public get governmentalId(): string {
    return this._properties.governmentalId;
  }
  public get name(): string {
    return this._properties.name;
  }
  public get contactName(): string {
    return this._properties.contactName;
  }
  public get contactPhone(): string {
    return this._properties.contactPhone;
  }
  public get email(): string {
    return this._properties.email;
  }
  public get address(): string {
    return this._properties.address;
  }
  public get city(): string {
    return this._properties.city;
  }
  public get zipCode(): string {
    return this._properties.zipCode;
  }
  public get budgetClassification(): string {
    return this._properties.budgetClassification;
  }

  public static create(
    domainObjectUuid: VendorUidType,
    properties: VendorProperties,
  ): Vendor {
    return new Vendor(domainObjectUuid, properties);
  }
}
