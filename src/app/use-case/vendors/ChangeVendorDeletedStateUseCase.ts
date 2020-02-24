import { DomainErrorToUseCaseResultMapper } from 'src/app/use-case/services';
import { VendorsRepository } from 'src/domain/vendors';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { UseCaseInputReader } from 'src/app/use-case/services';
import { InstanceFactory } from 'src/app/core/interfaces';
import { UseCaseContext } from 'src/app/use-case/context';
import { UseCaseResult } from '../results';
import { ChangeDeletedStateDataDto, WithIdParametersDto } from '../parameters';
import { UseCase } from '../definitions';

@injectable()
export class ChangeVendorDeletedStateUseCase implements UseCase {
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
      const [parameters, disabledRequestedState] = this.inputReader.read(
        context.input,
        [
          (useCaseInput, inputService) =>
            inputService.validInputFromFreeShapeObject(
              WithIdParametersDto,
              useCaseInput.parameters,
              {
                inputSection: 'parameters',
              },
            ),
          (useCaseInput, inputService) =>
            inputService.validInputFromFreeShapeObject(
              ChangeDeletedStateDataDto,
              useCaseInput.data,
              {
                inputSection: 'data',
              },
            ),
        ],
      );

      await this.vendorsRepository.setSoftDeleted(
        ((parameters as unknown) as WithIdParametersDto).id,
        ((disabledRequestedState as unknown) as ChangeDeletedStateDataDto)
          .deleted,
      );

      return UseCaseResult.success();
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
}
