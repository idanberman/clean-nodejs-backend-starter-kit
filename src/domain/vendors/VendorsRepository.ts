import {
  SoftDeletedRepository,
  BasicReadRepository,
  BasicWriteRepository,
} from '../interfaces/';
import { Vendor } from './Vendor';

export interface VendorsRepository
  extends BasicReadRepository<Vendor, number>,
    BasicWriteRepository<Vendor, number>,
    SoftDeletedRepository<Vendor, number> {}
