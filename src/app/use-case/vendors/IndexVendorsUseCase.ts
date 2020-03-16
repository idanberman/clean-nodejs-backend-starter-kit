import { UseCase } from '../definitions';
import { UseCaseContext } from '../context';
import { VendorsRepository, VendorDto, Vendor } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { DomainErrorToUseCaseResultMapper } from '../services';
import { InstanceFactory } from 'src/infrastructure/core/interfaces';
import { InputService } from 'src/app/services/input';
import { AppType } from 'src/app/AppType';
import { UseCaseResult } from '../results';

@injectable()
export class IndexVendorsUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;

  constructor(
    @inject(AppType.VendorsRepository)
    vendorsRepositoryInstanceFactory: InstanceFactory<VendorsRepository>,

    @inject(AppType.InputService)
    private readonly inputService: InputService,
  ) {
    this.vendorsRepository = vendorsRepositoryInstanceFactory();
    this.errorToUseCaseResultMapper = new DomainErrorToUseCaseResultMapper();
  }
  // tslint:disable-next-line: no-empty
  public dispose() {}
  public async run(useCaseContext: UseCaseContext): Promise<UseCaseResult> {
    try {
      const vendorList: Vendor[] = await this.vendorsRepository.findAll();
      const vendorDtoList: VendorDto[] = vendorList.map(
        vendor => vendor.toDto() as VendorDto,
      );

      return UseCaseResult.success(vendorDtoList);
    } catch (error) {
      return this.errorToUseCaseResultMapper.map(error);
    }
  }
}
