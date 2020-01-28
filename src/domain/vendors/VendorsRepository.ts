import { Vendor } from './Vendor';
import { BasicReadRepository } from '../interfaces/BasicReadRepository';
import { BasicWriteRepository } from '../interfaces/BasicWriteRepository';

export interface VendorsRepository
  extends BasicReadRepository<Vendor>,
    BasicWriteRepository<Vendor> {}
