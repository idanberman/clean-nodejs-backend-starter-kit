import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  interfaces,
  requestParam,
} from 'inversify-express-utils';
import { Vendor, VendorsRepository } from 'src/domain/vendors';
import { SuccessResult } from 'src/domain/value-objects';
import { VendorsService } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { DomainType } from 'src/domain/DomainType';

@controller('/vendors')
export class VendorsController implements interfaces.Controller {
  private readonly vendorsRepository;
  constructor(
    @inject(DomainType.VendorsRepository)
    vendorsRepositoryFactory: () => VendorsRepository,
  ) {
    this.vendorsRepository = vendorsRepositoryFactory();
  }
  @httpGet('/')
  async getAll(): Promise<SuccessResult<Vendor[]>> {
    return SuccessResult.create<Vendor[]>(
      await this.vendorsRepository.findAll(),
    );
  }

  @httpGet('/:id')
  async getOne(@requestParam('id') id: string): Promise<SuccessResult<Vendor>> {
    return SuccessResult.create<Vendor>(
      await this.vendorsRepository.findById(id),
    );
  }
}
