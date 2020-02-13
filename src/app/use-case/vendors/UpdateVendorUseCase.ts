import { UseCaseContext } from 'src/app/use-case/context';
import {
  InputReadingResult,
  InputService,
  InputReadingMode,
} from 'src/app/services/input';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { AppType } from 'src/app/AppType';
import { inject, injectable } from 'inversify';
import { UseCase } from '../definitions';
import {
  DomainErrorToUseCaseResultConverter,
  UseCaseInputReader,
} from '../tools';
import { InstanceFactory } from 'src/app/interfaces';
import { UseCaseResult, UseCaseSucceedResult } from '../results';
import { WithIdParametersDto } from '../parameters';

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
