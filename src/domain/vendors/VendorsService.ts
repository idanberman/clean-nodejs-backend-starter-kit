import { Vendor } from '../entities/Vendor';
import { injectable, inject } from 'inversify';
import { VendorsRepository } from '.';
import { SuccessResult } from '../value-objects';
import { DomainType } from '../DomainType';

@injectable()
export class VendorsService {
  constructor(
    @inject(DomainType.VendorsRepository)
    private readonly vendorsRepository: VendorsRepository,
  ) {}

  async findAll(): Promise<SuccessResult<Vendor[]>> {
    return new SuccessResult(await this.vendorsRepository.findAll());
    // return Promise.reject('Not implemented');
  }
}
