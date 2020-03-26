import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces';
import { VendorsRepository, Vendor, VendorDto } from 'src/domain/vendors';
import { WithNumericIdParameters } from '../common/input-schemas';
import { IoFormattingMode } from 'src/app/services/io-formatting-service';
import { WriteResourceNotFoundError } from 'src/domain/kernel/errors/operation';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { MultiInputReader } from 'src/app/services/multi-input-reader';
import { UseCase } from 'src/domain/kernel/ddd';
import { UseCaseContext, UseCaseResult } from 'src/domain/kernel/use-case';
@injectable()
export class DeleteVendorUseCase implements UseCase {
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

      if (!vendor) {
        throw new WriteResourceNotFoundError('id', parameters.id);
      }

      await this.vendorsRepository.removeById(parameters.id);

      return UseCaseResult.success();
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
}
