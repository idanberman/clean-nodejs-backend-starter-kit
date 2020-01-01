import { VendorsRepository } from 'src/domain/vendors';
import { Repository, EntityRepository, EntityManager } from 'typeorm';
import { Vendor } from 'src/domain/entities';
import { CrudTypeormRepository } from './CrudTypeormRepository';

@EntityRepository(Vendor)
export class TypeormVendorsRepository extends CrudTypeormRepository<Vendor>
  implements VendorsRepository {
  constructor(manager: EntityManager) {
    super(Vendor, manager);
  }
}
