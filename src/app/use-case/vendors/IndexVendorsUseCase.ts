import { UseCase } from '../definitions';
import { UseCaseContext } from '../context';
import { VendorsRepository, VendorDto, Vendor } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { DomainErrorToUseCaseResultConverter } from '../tools';
import { InstanceFactory } from 'src/app/core/interfaces';
import { InputService } from 'src/app/services/input';
import { AppType } from 'src/app/AppType';
import { UseCaseResult } from '../results';

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

      return UseCaseResult.success(vendorDtoList);
    } catch (error) {
      return this.errorToUseCaseResultConverter.convert(error);
    }
  }
}
