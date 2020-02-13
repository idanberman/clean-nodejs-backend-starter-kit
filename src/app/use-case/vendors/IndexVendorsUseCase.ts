import { UseCase } from '../definitions';
import { UseCaseContext } from '../context/UseCaseContext';
import { UseCaseResultPresenter } from '../definitions/UseCaseResultPresenter';
import { UseCaseResult } from '../results/UseCaseResult';
import { VendorsRepository, VendorDto, Vendor } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { DomainType } from 'src/domain/DomainType';
import { AppType } from '../../AppType';
import { InstanceFactory } from '../../interfaces/InstanceFactory';
import { UseCaseSucceedResult } from '../results/UseCaseSucceedResult';
import { DomainErrorToUseCaseResultConverter } from '../tools/DomainErrorToUseCaseResultConverter';
import { InputService } from '../../services/input';

@injectable()
export class IndexVendorsUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultConverter: DomainErrorToUseCaseResultConverter;

  constructor(
    @inject(AppType.VendorsRepository)
    vendorsRepositoryInstanceFactory: InstanceFactory<VendorsRepository>,

    @inject(AppType.InputService)
    private readonly inputService: InputService,
  ) {
    this.vendorsRepository = vendorsRepositoryInstanceFactory();
    this.errorToUseCaseResultConverter = new DomainErrorToUseCaseResultConverter();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
  public async run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    try {
      const vendorList: Vendor[] = await this.vendorsRepository.findAll();
      const vendorDtoList: VendorDto[] = vendorList.map(
        vendor => vendor.toDto() as VendorDto,
      );

      return new UseCaseSucceedResult(vendorDtoList);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
}
