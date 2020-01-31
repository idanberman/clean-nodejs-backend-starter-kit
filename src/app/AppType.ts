export const AppType = {
  DtoValidatorService: Symbol.for('DtoValidatorService'),
  ConfigurationProvider: Symbol.for('ConfigurationProvider'),
  VendorsRepository: Symbol.for('VendorsRepository'),

  // * Use Cases

  // Vendors UseCases
  CreateVendorUseCase: Symbol.for('CreateVendorUseCase'),
  IndexVendorsUseCase: Symbol.for('IndexVendorsUseCase'),
  GetVendorUseCase: Symbol.for('GetVendorUseCase'),
};
