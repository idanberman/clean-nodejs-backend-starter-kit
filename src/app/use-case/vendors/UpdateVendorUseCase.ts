import { UseCase, UseCaseInput } from '..';
import { UseCaseContext } from 'src/app/context';
import {
  InputReadingResult,
  InputService,
  InputReadingMode,
} from 'src/app/services/input';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { AppType } from 'src/app/AppType';
import { inject, injectable } from 'inversify';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { DomainErrorToUseCaseResultConverter } from 'src/app/services/DomainErrorToUseCaseResultConverter';
import { InputSyntaxError } from 'src/domain/errors/operation/by-user/InputSyntaxError';
import { UseCaseResult } from '../UseCaseResult';
import { UseCaseSucceedResult } from '../results/UseCaseSucceedResult';
import { WithIdParametersDto } from '../parameters/WithIdParametersDto';
import { UseCaseInputReader } from 'src/app/services/input/UseCaseInputReader';

@injectable()
export class UpdateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultConverter: DomainErrorToUseCaseResultConverter;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.UseCaseInputReader)
    private readonly inputReader: UseCaseInputReader,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultConverter = new DomainErrorToUseCaseResultConverter();
    this.vendorsRepository = vendorsRepositoryFactory();
  }

  public async run(context: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters, vendorDto] = this.inputReader.read(context.input, [
        (useCaseInput, inputService) =>
          inputService.validInputFromFreeObject(
            WithIdParametersDto,
            useCaseInput.parameters,
            {
              inputReadingMode: InputReadingMode.Update,
              inputSection: 'parameters',
            },
          ),
        (useCaseInput, inputService) =>
          inputService.validInputFromFreeObject(VendorDto, useCaseInput.data, {
            inputReadingMode: InputReadingMode.Update,
            inputSection: 'data',
          }),
      ]);
      // const updateVendorEntity: Vendor = this.getEntity(context.input.data);
      const vendorData: Partial<Vendor> = await this.vendorsRepository.updateEntity(
        ((parameters as unknown) as WithIdParametersDto).id,
        (vendorDto as unknown) as VendorDto,
      );
      const actualVendor = Vendor.build(vendorData);

      return new UseCaseSucceedResult(actualVendor.toDto());
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
  public dispose() {}
}
