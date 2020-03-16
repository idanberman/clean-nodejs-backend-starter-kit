import { UseCaseContext } from 'src/app/use-case/context';
import { UseCaseResult } from '../results';
import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InputService, InputReadingMode } from 'src/app/services/input';
import { UseCase } from '../definitions';
import {
  DomainErrorToUseCaseResultMapper,
  UseCaseInputReader,
} from '../services';
import { InstanceFactory } from 'src/infrastructure/core/interfaces';
import { WithIdParametersDto } from '../parameters';

@injectable()
export class ReadOneVendorUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;

  constructor(
    @inject(AppType.VendorsRepository)
    vendorsRepositoryInstanceFactory: InstanceFactory<VendorsRepository>,

    @inject(AppType.UseCaseInputReader)
    private readonly inputReader: UseCaseInputReader,
  ) {
    this.vendorsRepository = vendorsRepositoryInstanceFactory();
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
  public async run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters] = this.inputReader.read(useCaseContext.input, [
        (useCaseInput, inputService) =>
          inputService.validInputFromFreeShapeObject(
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

      return UseCaseResult.success(vendorDto);
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
}
