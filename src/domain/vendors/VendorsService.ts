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

<<<<<<< HEAD
  async findAll(): Promise<SuccessResult<Vendor[]>> {
    return new SuccessResult(await this.vendorsRepository.findAll());
=======
  async find(): Promise<SuccessResponse<Vendor[]>> {
    return new SuccessResponse(await this.vendorsRepository.find());
>>>>>>> f92321b2ecfed4819e328249e4d10e6025fb5295
    // return Promise.reject('Not implemented');
  }
}
