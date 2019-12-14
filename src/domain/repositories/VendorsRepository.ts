import { Repository } from 'typeorm';

import { Vendor } from '../entities/Vendor';

// It's anti-pattern to extend the interface of the library.
// In case the librry will change the interface must be implemented
// with the methods that used in the application the parent interface Repository<>
// from typeorm lib.
export interface VendorsRepository extends Repository<Vendor> {}
