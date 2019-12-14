import { Controller, Get, Inject } from '@nestjs/common';
import { Vendor } from 'src/domain/entities/Vendor';
// import { VendorsService } from 'src/domain/services/';
import { VendorsService } from '../../domain/services/VendorsService';
import InterfaceId from 'src/domain/types-interfaces-identifiers';

@Controller(`vendors`)
export class VendorController {
  constructor(
    @Inject(InterfaceId.VendorsService)
    private readonly vendorsService: VendorsService,
  ) {}

  @Get()
  async getFind(): Promise<Vendor[]> {
    return await this.vendorsService.find();
  }
}
