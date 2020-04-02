import { VendorsRepository } from 'src/domain/vendors';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { MultiInputReader } from 'src/app/services/multi-input-reader';
import {
  WithNumericIdParameters,
  ChangeDeletedStateData,
} from 'src/app/use-cases/common/input-schemas';
import { UseCase } from 'src/domain/kernel/ddd';
import { UseCaseContext, UseCaseResult } from 'src/domain/kernel/use-case';
import { IoFormattingMode } from 'src/app/services/io-formatting-service';

@injectable()
export class ChangeVendorDeletedStateUseCase implements UseCase {
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;
  private readonly vendorsRepository: VendorsRepository;

  constructor(
    @inject(AppType.MultiInputReader)
    private readonly multiInputReader: MultiInputReader,
    @inject(AppType.VendorsRepository)
    readonly vendorsRepositoryFactory: InstanceFactory<VendorsRepository>,
  ) {
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
    this.vendorsRepository = vendorsRepositoryFactory();
  }

  public async run(context: UseCaseContext): Promise<UseCaseResult> {
    try {
      const [parameters, disabledRequestedState] = this.multiInputReader.read(
        context.input,
        [
          (useCaseInput, ioFormattingService) =>
            ioFormattingService.formatObject(
              WithNumericIdParameters,
              useCaseInput.parameters,
              {
                ioFormattingMode: IoFormattingMode.Default,
                inputSection: 'parameters',
              },
            ),
          (useCaseInput, ioFormattingService) =>
            ioFormattingService.formatObject(
              ChangeDeletedStateData,
              useCaseInput.data,
              {
                ioFormattingMode: IoFormattingMode.Default,
                inputSection: 'data',
              },
            ),
        ],
      );

      await this.vendorsRepository.setSoftDeleted(
        ((parameters as unknown) as WithNumericIdParameters).id,
        ((disabledRequestedState as unknown) as ChangeDeletedStateData).deleted,
      );

      return UseCaseResult.success();
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
}
