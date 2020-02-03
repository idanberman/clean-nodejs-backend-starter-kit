export const AppType = {
  InputService: Symbol.for('InputService'),
  ConfigurationProvider: Symbol.for('ConfigurationProvider'),
  VendorsRepository: Symbol.for('VendorsRepository'),

  // * Use Cases

  // Vendors UseCases
  CreateVendorUseCase: Symbol.for('CreateVendorUseCase'),
  IndexVendorsUseCase: Symbol.for('IndexVendorsUseCase'),
  GetVendorUseCase: Symbol.for('GetVendorUseCase'),
};
