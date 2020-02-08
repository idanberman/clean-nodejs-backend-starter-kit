export const AppType = {
  InputService: Symbol.for('InputService'),
  ConfigurationProvider: Symbol.for('ConfigurationProvider'),
  UseCaseInputReader: Symbol.for('UseCaseInputReader'),
  VendorsRepository: Symbol.for('VendorsRepository'),

  // * Use Cases

  // Vendors UseCases
  CreateVendorUseCase: Symbol.for('CreateVendorUseCase'),
  IndexVendorsUseCase: Symbol.for('IndexVendorsUseCase'),
  ReadOneVendorUseCase: Symbol.for('ReadOneVendorUseCase'),
  UpdateVendorUseCase: Symbol.for('UpdateVendorUseCase'),
  DeleteVendorUseCase: Symbol.for('DeleteVendorUseCase'),
};
