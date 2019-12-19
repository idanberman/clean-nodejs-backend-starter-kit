import InterfaceId from 'src/domain/types-interfaces-identifiers';
import { TypeormVendorsRepository } from '../repositories';

export const InterfaceToRepositoryImplementation = {
  [InterfaceId.VendorsRepository]: TypeormVendorsRepository,
};
