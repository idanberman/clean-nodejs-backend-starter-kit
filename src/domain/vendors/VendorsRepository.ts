import { BasicReadRepository, BasicWriteRepository } from '../interfaces/';
import { Vendor } from './Vendor';
import { StandardUuid } from '../kernel/ddd/object-identity';

export interface VendorsRepository
  extends BasicReadRepository<Vendor, StandardUuid>,
    BasicWriteRepository<Vendor, StandardUuid> {}
