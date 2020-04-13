import { Vendor, VendorsRepository } from 'src/domain/vendors';
import { EntityManager, EntityRepository } from 'typeorm';
import { VendorDbEntity } from 'src/infrastructure/core/db-entities/VendorDbEntity';
import { VendorProperties } from 'src/domain/vendors/VendorProperties';

export class TypeormVendorsRepository
  extends SoftDeleteWriteRepositoryTypeormAdapter<
    Vendor,
    VendorDbEntity,
    number
  >
  implements VendorsRepository {
  constructor(manager: EntityManager) {
    super(Vendor, VendorDbEntity, manager);
  }
}
