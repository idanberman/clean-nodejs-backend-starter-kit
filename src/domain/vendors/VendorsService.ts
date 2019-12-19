import { Vendor } from '../entities/Vendor';
import { Injectable, Inject } from '@nestjs/common';
import { VendorsRepository } from '.';
import InterfaceId from '../types-interfaces-identifiers';
import { SuccessResponse } from '../value-objects';

@Injectable()
export class VendorsService {
  constructor(
    @Inject(InterfaceId.VendorsRepository)
    private readonly vendorsRepository: VendorsRepository,
  ) {}

  async find(): Promise<SuccessResponse<Vendor[]>> {
    return new SuccessResponse(await this.vendorsRepository.find());
    // return Promise.reject('Not implemented');
  }
}
