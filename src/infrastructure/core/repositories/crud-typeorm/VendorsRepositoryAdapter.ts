import { VendorsRepository } from 'src/domain/vendors';
import { applyMixin } from 'src/infrastructure/application-container/js-helpers';
import { CrudTypeormRepository } from 'src/infrastructure/persistence/typeorm-adapter/repositories/common/CrudTypeormRepository';
import { CrudWithSoftDeleteAbilityTypeormRepository } from 'src/infrastructure/persistence/typeorm-adapter/repositories/common/CrudWithSoftDeleteAbilityTypeormRepository';

// tslint:disable-next-line: no-empty-interface
export interface VendorsRepositoryAdapter extends VendorsRepository {}
export class VendorsRepositoryAdapter {}

applyMixin(VendorsRepositoryAdapter, [
  CrudTypeormRepository,
  CrudWithSoftDeleteAbilityTypeormRepository,
]);
