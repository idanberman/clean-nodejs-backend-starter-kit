import { Vendor, VendorsRepository } from 'src/domain/vendors';
import { EntityManager, EntityRepository } from 'typeorm';
import { CrudTypeormRepository } from './CrudTypeormRepository';

@EntityRepository(Vendor)
export class TypeormVendorsReadWriteRepository
  extends CrudTypeormRepository<Vendor>
  implements VendorsRepository {
  constructor(manager: EntityManager) {
    super(Vendor, manager);
  }
}
