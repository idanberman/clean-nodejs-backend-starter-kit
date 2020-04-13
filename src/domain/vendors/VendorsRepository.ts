import {
  SoftDeletedRepository,
  BasicReadRepository,
  BasicWriteRepository,
} from '../interfaces/';
import { Vendor, VendorUidType } from './Vendor';

export interface VendorsRepository
  extends BasicReadRepository<Vendor, VendorUidType>,
    BasicWriteRepository<Vendor, VendorUidType>,
    SoftDeletedRepository<Vendor, VendorUidType> {}
