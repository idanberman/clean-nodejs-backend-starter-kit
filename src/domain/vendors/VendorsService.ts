import { Vendor } from './Vendor';
import { injectable, inject } from 'inversify';
import { VendorsRepository } from '.';
import { SuccessResult } from '../value-objects';
import { DomainType } from '../DomainType';

export class VendorsService {
  private readonly vendorsRepository: VendorsRepository;

  constructor(vendorsRepositoryFactory: () => VendorsRepository) {
    this.vendorsRepository = vendorsRepositoryFactory();
  }
}
