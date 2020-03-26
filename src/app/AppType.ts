export const AppType = {
  IoFormattingService: Symbol.for('IoFormattingService'),
  ConfigurationProvider: Symbol.for('ConfigurationProvider'),
  MultiInputReader: Symbol.for('MultiInputReader'),
  VendorsRepository: Symbol.for('VendorsRepository'),

  // * Use Cases

  // Vendors UseCases
  CreateVendorUseCase: Symbol.for('CreateVendorUseCase'),
  IndexVendorsUseCase: Symbol.for('IndexVendorsUseCase'),
  ReadOneVendorUseCase: Symbol.for('ReadOneVendorUseCase'),
  UpdateVendorUseCase: Symbol.for('UpdateVendorUseCase'),
  ChangeVendorDeletedStateUseCase: Symbol.for(
    'ChangeVendoChangeVendorDeletedStateUseCase',
  ),
  DeleteVendorUseCase: Symbol.for('DeleteVendorUseCase'),
};
