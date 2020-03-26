import { VendorsRepository, VendorDto, Vendor } from 'src/domain/vendors';
import { injectable, inject } from 'inversify';
import { InstanceFactory } from 'src/infrastructure/application-container/interfaces';
import { IoFormattingService } from 'src/app/services/io-formatting-service';
import { AppType } from 'src/app/AppType';
import { DomainErrorToUseCaseResultMapper } from 'src/app/use-cases/common/domain-error-mapper';
import { UseCase } from 'src/domain/kernel/ddd';
import { UseCaseContext, UseCaseResult } from 'src/domain/kernel/use-case';

@injectable()
export class IndexVendorsUseCase implements UseCase {
  private readonly vendorsRepository: VendorsRepository;
  private readonly errorToUseCaseResultMapper: DomainErrorToUseCaseResultMapper;

  constructor(
    @inject(AppType.VendorsRepository)
    vendorsRepositoryInstanceFactory: InstanceFactory<VendorsRepository>,

    @inject(AppType.IoFormattingService)
    private readonly ioFormattingService: IoFormattingService,
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
