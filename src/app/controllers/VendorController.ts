import { Controller, Get, Inject } from '@nestjs/common';
import { Vendor } from 'src/domain/entities/Vendor';
// import { VendorsService } from 'src/domain/services/';
import { VendorsService } from 'src/domain/vendors/VendorsService';
import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { SuccessResponse } from 'src/domain/value-objects';

@Controller(`vendors`)
export class VendorController {
  constructor(
    @Inject(InterfaceId.VendorsService)
    private readonly vendorsService: VendorsService,
  ) {}

  @Get()
  async getFind(): Promise<SuccessResponse<Vendor[]>> {
    return await this.vendorsService.find();
  }
}
