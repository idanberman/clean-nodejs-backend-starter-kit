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
  DomainErrorToUseCaseResultMapper,
  UseCaseInputReader,
} from '../services';
import { InstanceFactory } from 'src/app/core/interfaces';
import { UseCaseResult } from '../results';
import { WithIdParametersDto } from '../parameters';

@injectable()
export class UpdateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.UseCaseInputReader)
    private readonly inputReader: UseCaseInputReader,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
    this.vendorsRepository = vendorsRepositoryFactory();
  }

  public async run(context: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters, vendorDto] = this.inputReader.read(context.input, [
        (useCaseInput, inputService) =>
          inputService.validInputFromFreeShapeObject(
            WithIdParametersDto,
            useCaseInput.parameters,
            {
              inputReadingMode: InputReadingMode.Update,
              inputSection: 'parameters',
            },
          ),
        (useCaseInput, inputService) =>
          inputService.validInputFromFreeShapeObject(
            VendorDto,
            useCaseInput.data,
            {
              inputReadingMode: InputReadingMode.Update,
              inputSection: 'data',
            },
          ),
      ]);
      // const updateVendorEntity: Vendor = this.getEntity(context.input.data);
      const vendorData: Partial<Vendor> = await this.vendorsRepository.updateEntity(
        ((parameters as unknown) as WithIdParametersDto).id,
        (vendorDto as unknown) as VendorDto,
      );
      const actualVendor = Vendor.build(vendorData);

      return UseCaseResult.success(actualVendor.toDto());
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
  public dispose() {}
}
