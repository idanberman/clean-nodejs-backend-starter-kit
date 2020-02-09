import { Vendor, VendorsRepository } from 'src/domain/vendors';
import { EntityManager, EntityRepository } from 'typeorm';
import { CrudWithSoftDeleteAbilityTypeormRepository } from './CrudWithSoftDeleteAbilityTypeormRepository';

@EntityRepository(Vendor)
export class TypeormVendorsReadWriteRepository
  extends CrudWithSoftDeleteAbilityTypeormRepository<Vendor>
  implements VendorsRepository {
  constructor(manager: EntityManager) {
    super(Vendor, manager);
  }
}
