import {
  controller,
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  interfaces,
} from 'inversify-express-utils';
import { Vendor } from 'src/domain/entities/Vendor';
import { SuccessResult } from 'src/domain/value-objects';
import { VendorsService } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { DomainType } from 'src/domain/DomainType';

@controller('/vendors')
export class VendorsController implements interfaces.Controller {
  constructor(
    @inject(DomainType.VendorsService)
    private readonly vendorsService: VendorsService,
  ) {}
  @httpGet('/id')
  async getFind(): Promise<SuccessResult<Vendor[]>> {
    console.log('hhhx');
    return await this.vendorsService.findAll();
  }
}
