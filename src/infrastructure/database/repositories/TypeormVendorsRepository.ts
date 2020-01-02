import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import { EntityManager, EntityRepository } from 'typeorm';
import { CrudTypeormRepository } from './CrudTypeormRepository';

@EntityRepository(Vendor)
export class TypeormVendorsRepository extends CrudTypeormRepository<Vendor>
  implements VendorsRepository {
  constructor(manager: EntityManager) {
    super(Vendor, manager);
  }
}
