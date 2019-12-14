import { Vendor } from '../entities/Vendor';
import { Injectable, Inject } from '@nestjs/common';
import { VendorsRepository } from '../repositories/VendorsRepository';
import InterfaceId from '../types-interfaces-identifiers';
import { SuccessResponse } from '../value-objects/responses/SuccessResponse';

@Injectable()
export class VendorsService {
  constructor(
    @Inject(InterfaceId.VendorsRepository)
    private readonly vendorsRepository: VendorsRepository,
  ) {}

  async find(): Promise<SuccessResponse<Vendor[]>> {
    return Promise.reject('Not implemented');
  }
}
