import { Vendor, VendorDto, VendorsRepository } from 'src/domain/vendors';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import {
  IoFormattingService,
  IoFormattingMode,
} from 'src/app/services/io-formatting-service';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces';
import { WithNumericIdParameters } from '../common/input-schemas';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { MultiInputReader } from 'src/app/services/multi-input-reader';
import { UseCase } from 'src/domain/kernel/ddd';
import { UseCaseContext, UseCaseResult } from 'src/domain/kernel/use-case';

@injectable()
export class ReadOneVendorUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;

  constructor(
    @inject(AppType.VendorsRepository)
    vendorsRepositoryInstanceFactory: InstanceFactory<VendorsRepository>,

    @inject(AppType.MultiInputReader)
    private readonly multiInputReader: MultiInputReader,
  ) {
    this.vendorsRepository = vendorsRepositoryInstanceFactory();
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
  public async run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters] = this.multiInputReader.read(useCaseContext.input, [
        (useCaseInput, ioFormattingService) =>
          ioFormattingService.formatObject(
            WithNumericIdParameters,
            useCaseInput.parameters,
            {
              ioFormattingMode: IoFormattingMode.Update,
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
