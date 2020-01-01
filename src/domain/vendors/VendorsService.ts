import { Vendor } from '../entities/Vendor';
import { injectable, inject } from 'inversify';
import { VendorsRepository } from '.';
import { SuccessResult } from '../value-objects';
import { DomainType } from '../DomainType';

@injectable()
export class VendorsService {
  private readonly vendorsRepository: VendorsRepository;

  constructor(
    @inject(DomainType.VendorsRepository)
    vendorsRepositoryFactory: () => VendorsRepository,
  ) {
    this.vendorsRepository = vendorsRepositoryFactory();
  }

  async findAll(): Promise<SuccessResult<Vendor[]>> {
    return new SuccessResult(await this.vendorsRepository.findAll());
  }
}
