import { UseCase } from '../use-case';
import { UseCaseContext } from '../context/UseCaseContext';
import { UseCaseResultPresenter } from '../interfaces/UseCaseResultPresenter';
import { UseCaseResult } from '../use-case/UseCaseResult';
import { VendorsRepository, VendorDto, Vendor } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { AppType } from '../AppType';
import { InstanceFactory } from '../interfaces/InstanceFactory';
import { DtoValidatorService } from '../interfaces';
import { UseCaseSucceedResult } from '../use-case/results/UseCaseSucceedResult';
import { ValidationFailedResult } from 'src/domain/value-objects';
import { ErrorToUseCaseResultConverter } from '../services/ErrorToUseCaseResultConverter';
@injectable()
export class IndexVendorsUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultConverter: ErrorToUseCaseResultConverter;

  constructor(
    @inject(AppType.VendorsRepository)
    private readonly vendorsRepositoryInstanceFactory: InstanceFactory<
      VendorsRepository
    >,

    @inject(AppType.DtoValidatorService)
    private readonly dtoValidator: DtoValidatorService,
  ) {
    this.vendorsRepository = vendorsRepositoryInstanceFactory();
    this.errorToUseCaseResultConverter = new ErrorToUseCaseResultConverter();
  }
  // tslint:disable-next-line: no-empty
  dispose() {}
  async run(
    useCaseContext: UseCaseContext,
    presenter: UseCaseResultPresenter,
  ): Promise<UseCaseResult> {
    try {
      const vendorList: Vendor[] = await this.vendorsRepository.findAll();
      const vendorDtoList: VendorDto[] = vendorList.map(
        vendor => vendor.toDto() as VendorDto,
      );

      return presenter.present(new UseCaseSucceedResult(vendorDtoList));
    } catch (error) {
      return presenter.present(
        this.errorToUseCaseResultConverter.convert(error),
      );
    }
  }
}
