import { UseCase } from '../definitions';
import { UseCaseContext } from '../context';
import { inject, injectable } from 'inversify';
import { AppType } from 'src/app/AppType';
import { InstanceFactory } from 'src/app/core/interfaces';
import { VendorsRepository, Vendor, VendorDto } from 'src/domain/vendors';
import {
  UseCaseInputReader,
  DomainErrorToUseCaseResultMapper,
} from 'src/app/use-case/services';
import { WithIdParametersDto } from '../parameters';
import { InputReadingMode } from 'src/app/services/input';
import { UseCaseResult } from '../results';
import { WriteResourceNotFoundError } from 'src/domain/errors/operation';
@injectable()
export class DeleteVendorUseCase implements UseCase {
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
