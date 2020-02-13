import { UseCaseContext } from 'src/app/use-case/context';
import { UseCaseResult } from '../results/UseCaseResult';
import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import { UseCaseSucceedResult } from '../results/UseCaseSucceedResult';
import { DomainErrorToUseCaseResultConverter } from 'src/app/use-case/tools/DomainErrorToUseCaseResultConverter';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { InputService, InputReadingMode } from 'src/app/services/input';
import { WithIdParametersDto } from '../parameters/WithIdParametersDto';
import { UseCaseInputReader } from 'src/app/use-case/tools/UseCaseInputReader';
import { UseCase } from '../definitions';

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
  // tslint:disable-next-line: no-empty
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
