import { UseCase } from '..';
import { UseCaseContext } from '../../context';
import { UseCaseResult } from '../UseCaseResult';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/interfaces/InstanceFactory';
import { VendorsRepository, Vendor, VendorDto } from 'src/domain/vendors';
import { UseCaseInputReader } from 'src/app/services/input/UseCaseInputReader';
import { DomainErrorToUseCaseResultConverter } from 'src/app/services/DomainErrorToUseCaseResultConverter';
import { WithIdParametersDto } from '../parameters/WithIdParametersDto';
import { InputReadingMode } from 'src/app/services/input';
import { UseCaseSucceedResult } from '../results/UseCaseSucceedResult';
import { WriteResourceNotFoundError } from 'src/domain/errors/operation';
@injectable()
export class DeleteVendorUseCase implements UseCase {
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

      if (!vendor) {
        throw new WriteResourceNotFoundError('id', parameters.id);
      }

      await this.vendorsRepository.removeById(parameters.id);

      return new UseCaseSucceedResult(null);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
}
