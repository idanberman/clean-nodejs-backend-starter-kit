import { UseCase } from 'src/app/use-case';
import { VendorDto, VendorsRepository, Vendor } from 'src/domain/vendors';
import { UseCaseResult } from 'src/app/use-case/UseCaseResult';
import { injectable, inject } from 'inversify';
import { AppType } from '../AppType';
import { DtoValidatorService } from '../interfaces';
import { UseCaseBadInputResult } from 'src/app/use-case/results/UseCaseBadInputResult';
import { ValidationFailedResult } from 'src/domain/value-objects';
import { DomainType } from 'src/domain/DomainType';
import { UseCaseSucceedResult } from 'src/app/use-case/results/UseCaseSucceedResult';
import { ErrorToUseCaseResultConverter } from '../services/ErrorToUseCaseResultConverter';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { UseCaseContext } from '../context/UseCaseContext';

export class CreateVendorUseCase implements UseCase {
  private readonly errorToUseCaseResultConverter: ErrorToUseCaseResultConverter;
  constructor(
    private readonly dtoValidator: DtoValidatorService,
    private readonly vendorsRepository: VendorsRepository,
  ) {
    this.errorToUseCaseResultConverter = new ErrorToUseCaseResultConverter();
  }
  // tslint:disable-next-line: no-empty
  dispose() {}
  async run(
    context: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    const validationResult = await this.dtoValidator.validate(context.input);
    const createVendorDto = context.input.data;
    if (!validationResult.isSucceed()) {
      return presenter.present(
        new UseCaseBadInputResult(
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
