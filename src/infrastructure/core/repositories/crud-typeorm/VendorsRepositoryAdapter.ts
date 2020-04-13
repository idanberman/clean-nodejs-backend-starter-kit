import { Vendor } from 'src/domain/vendors';
import {
  BasicWriteRepository,
  TransactionContext,
} from 'src/domain/interfaces';
import { injectable, inject } from 'inversify';
import { AppType } from 'src/app/AppType';

@injectable()
export class VendorsRepositoryAdapter
  implements BasicWriteRepository<Vendor, number> {
  constructor(
    @inject(AppType.TransactionContext)
    protected transactionContext: TransactionContext,
  ) {}
  public createEntity(entity: Vendor): Promise<Vendor> {
    throw new Error('Method not implemented.');
  }
  public updateEntity(entity: Vendor): Promise<Vendor> {
    throw new Error('Method not implemented.');
  }
  public removeEntity(entity: Vendor): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public removeById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
