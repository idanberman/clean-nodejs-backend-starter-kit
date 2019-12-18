import { VendorsRepository } from 'src/domain/vendors';
import { Repository, EntityRepository } from 'typeorm';
import { Vendor } from 'src/domain/entities';

@EntityRepository(Vendor)
export class TypeormVendorsRepository extends Repository<Vendor>
  implements VendorsRepository {
  constructor() {
    super();
  }
}
