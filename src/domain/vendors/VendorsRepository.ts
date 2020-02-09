import { Vendor } from './Vendor';
import { BasicReadRepository } from '../interfaces/BasicReadRepository';
import { BasicWriteRepository } from '../interfaces/BasicWriteRepository';
import { SoftDeletedRepository } from '../interfaces';

export interface VendorsRepository
  extends BasicReadRepository<Vendor>,
    BasicWriteRepository<Vendor>,
    SoftDeletedRepository<Vendor> {}
