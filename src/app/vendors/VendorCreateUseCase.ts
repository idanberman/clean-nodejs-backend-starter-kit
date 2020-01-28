import { UseCase } from 'src/domain/value-objects/use-case';
import { VendorDto, VendorsRepository } from 'src/domain/vendors';
import { UseCaseResult } from 'src/domain/value-objects/use-case/UseCaseResult';
import { injectable, inject } from 'inversify';
import { AppType } from '../AppType';
import { DtoValidatorService } from '../interfaces';
import { UseCaseBadInputResult } from 'src/domain/value-objects/use-case/results/UseCaseBadInputResult';
import { ValidationFailedResult } from 'src/domain/value-objects';
import { DomainType } from 'src/domain/DomainType';

@injectable()
export class VendorCreateUseCase implements UseCase<VendorDto> {
  constructor(
    @inject(AppType.DtoValidatorService)
    private readonly dtoValidator: DtoValidatorService,
    @inject(DomainType.VendorsRepository)
    private readonly vendorsRepository: VendorsRepository,
  ) {}
  async run(createVendorDto: VendorDto): Promise<UseCaseResult> {
    const validationResult = await this.dtoValidator.validate(createVendorDto);

    if (!validationResult.isSucceed()) {
      return new UseCaseBadInputResult(
        (validationResult as ValidationFailedResult).fieldErrorsDescription,
      );
    }
  }
}
