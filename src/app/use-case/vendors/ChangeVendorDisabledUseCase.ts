import { UseCase } from '..';
import { DomainErrorToUseCaseResultConverter } from 'src/app/services/DomainErrorToUseCaseResultConverter';
import { VendorsRepository, VendorDto, Vendor } from 'src/domain/vendors';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { UseCaseInputReader } from 'src/app/services/input/UseCaseInputReader';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { UseCaseContext } from 'src/app/context';
import { UseCaseResult } from '../UseCaseResult';
import { WithIdParametersDto } from '../parameters/WithIdParametersDto';
import { UseCaseSucceedResult } from '../results/UseCaseSucceedResult';
import { ChangeDeletedStateDataDto } from '../parameters/ChangeDeletedStateDataDto';

@injectable()
export class ChangeVendorDisabledUseCase implements UseCase {
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
      const [parameters, disabledRequestedState] = this.inputReader.read(
        context.input,
        [
          (useCaseInput, inputService) =>
            inputService.validInputFromFreeObject(
              WithIdParametersDto,
              useCaseInput.parameters,
              {
                inputSection: 'parameters',
              },
            ),
          (useCaseInput, inputService) =>
            inputService.validInputFromFreeObject(
              ChangeDeletedStateDataDto,
              useCaseInput.data,
              {
                inputSection: 'data',
              },
            ),
        ],
      );

      // const updateVendorEntity: Vendor = this.getEntity(context.input.data);
      await this.vendorsRepository.setSoftDeleted(
        ((parameters as unknown) as WithIdParametersDto).id,
        ((disabledRequestedState as unknown) as ChangeDeletedStateDataDto)
          .deleted,
      );

      return new UseCaseSucceedResult(null);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
}
