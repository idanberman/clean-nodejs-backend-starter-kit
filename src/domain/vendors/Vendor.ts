import { AggregateRoot, DomainObjectIdentity } from '../kernel/ddd';
import { SimplePlainObject } from '../kernel/building-blocks/SimplePlainObject';
import { VendorProperties } from './VendorProperties';

type VendorId = number;
export class Vendor extends AggregateRoot<VendorId>
  implements VendorProperties {
  constructor(domainObjectUuid: VendorId) {
    super(new DomainObjectIdentity(domainObjectUuid, 'Vendor'));
  }

  public readonly governmentalId: string;
  public readonly name: string;
  public readonly contactName: string;
  public readonly contactPhone: string;
  public readonly email: string;
  public readonly address: string;
  public readonly city: string;
  public readonly zipCode: string;
  public readonly budgetClassification: string;
  public readonly version: number;
  public readonly deletedAt: Date;

  public getProperties(): SimplePlainObject {
    return { ...new VendorProperties() };
  }
  public static create(domainObjectUuid: VendorId): Vendor {
    return new Vendor(domainObjectUuid);
  }
}
