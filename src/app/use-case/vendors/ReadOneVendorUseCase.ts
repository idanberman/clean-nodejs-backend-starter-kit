import { UseCase } from '..';
import { UseCaseContext } from 'src/app/context';
import { UseCaseResult } from '../UseCaseResult';
import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import { UseCaseSucceedResult } from '../results/UseCaseSucceedResult';
import { DomainErrorToUseCaseResultConverter } from 'src/app/services/DomainErrorToUseCaseResultConverter';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { InputService, InputReadingMode } from 'src/app/services/input';
import { WithIdParametersDto } from '../parameters/WithIdParametersDto';
import { UseCaseInputReader } from 'src/app/services/input/UseCaseInputReader';

@injectable()
export class ReadOneVendorUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultConverter: DomainErrorToUseCaseResultConverter;

  constructor(
    @inject(AppType.VendorsRepository)
    vendorsRepositoryInstanceFactory: InstanceFactory<VendorsRepository>,

    @inject(AppType.UseCaseInputReader)
    private readonly inputReader: UseCaseInputReader,
  ) {
    this.vendorsRepository = vendorsRepositoryInstanceFactory();
    this.errorToUseCaseResultConverter = new DomainErrorToUseCaseResultConverter();
  }
  public dispose() {}
  public async run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters] = this.inputReader.read(useCaseContext.input, [
        (useCaseInput, inputService) =>
          inputService.validInputFromFreeObject(
            WithIdParametersDto,
            useCaseInput.parameters,
            {
              inputReadingMode: InputReadingMode.Update,
              inputSection: 'parameters',
            },
          ),
      ]);

      const vendor: Vendor = await this.vendorsRepository.findById(
        parameters.id,
      );
      const vendorDto: VendorDto = vendor.toDto() as VendorDto;

      return new UseCaseSucceedResult(vendorDto);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
}
