import { UseCase } from 'src/app/use-case';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { injectable, inject } from 'inversify';
import { AppType } from '../AppType';
import { DtoValidatorService } from '../interfaces';
import { UseCaseInputSyntaxErrorResult } from 'src/app/use-case/results/UseCaseInputSyntaxErrorResult';
import { ValidationFailedResult } from 'src/domain/value-objects';
import { UseCaseSucceedResult } from 'src/app/use-case/results/UseCaseSucceedResult';
import { ErrorToUseCaseResultConverter } from '../services/ErrorToUseCaseResultConverter';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { UseCaseContext } from '../context/UseCaseContext';
import { ValidationMode } from 'src/domain/value-objects/validation';
import { InstanceFactory } from '../interfaces/InstanceFactory';

@injectable()
export class CreateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultConverter: ErrorToUseCaseResultConverter;
  private readonly vendorsRepository: VendorsRepository;
  constructor(
    @inject(AppType.DtoValidatorService)
    private readonly dtoValidator: DtoValidatorService,
    @inject(AppType.VendorsRepository)
    private readonly vendorsRepositoryFactory: InstanceFactory<
      VendorsRepository
    >,
  ) {
    this.errorToUseCaseResultConverter = new ErrorToUseCaseResultConverter();
    this.vendorsRepository = vendorsRepositoryFactory();
  }
  // tslint:disable-next-line: no-empty
  dispose() {}
  async run(
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    const dto: VendorDto = new VendorDto(context.input.data);
    const validationResult = await this.dtoValidator.validate(dto, {
      validationMode: ValidationMode.Create,
    });
    const createVendorDto = context.input.data;
    if (!validationResult.isSucceed()) {
      return presenter.present(
        new UseCaseInputSyntaxErrorResult(
          (validationResult as ValidationFailedResult).fieldErrorsDescription,
        ),
      );
    }

    try {
      const vendorDto: VendorDto = await this.vendorsRepository.createEntity(
        Vendor.build(createVendorDto),
      );
      return presenter.present(new UseCaseSucceedResult(vendorDto));
    } catch (error) {
      return presenter.present(
        this.errorToUseCaseResultConverter.convert(error),
      );
    }
  }
}
